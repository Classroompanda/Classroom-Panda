using DayCare.API.Infrastructure;
using DayCare.Data;
using DayCare.Entity.Agency;
using DayCare.Model.Response;
using DayCare.Repository.IRepository;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.WebSockets;
using System.Text;
using System.Threading.Tasks;

namespace DayCare.API.WebSockets
{
    public class ChatRoomHandler : WebSocketHandler
    {
        private string token = string.Empty;

        class ChatMessageBody
        {
            public int SenderUserID { get; set; }
            public int ReceiverUserID { get; set; }
            public string Token { get; set; }
            public string Message { get; set; }
            public int AgencyID { get; set; }

             
        }

        public ChatRoomHandler(WebSocketConnectionManager webSocketConnectionManager) : base(webSocketConnectionManager)
        {
        }

        public override async Task OnConnected(WebSocket socket)
        {
            await base.OnConnected(socket);

            var socketId = WebSocketConnectionManager.GetId(socket);
            token = socketId;
            await SendMessageToAllAsync($"{socketId} is now connected");
        }

        public override async Task ReceiveAsync(WebSocket socket, WebSocketReceiveResult result, byte[] buffer)
        {
            string message = Encoding.UTF8.GetString(buffer, 0, result.Count);
            var model = JsonConvert.DeserializeObject<ChatMessageBody>(message);
            ResponseViewModal res = new ResponseViewModal();

            var opt = NpgsqlDbContextOptionsExtensions.UseNpgsql(new DbContextOptionsBuilder<DataContext>(), DayCareConstants.DayCareConnection).Options;
            var dataContext = new DataContext(opt);

            try
            {
                model.Token = string.IsNullOrEmpty(model.Token) ? token : model.Token;

                ChatPrivateMessageDetails chatObj = new ChatPrivateMessageDetails();
                chatObj.FromUserId = model.SenderUserID;
                chatObj.ToUserId = model.ReceiverUserID;
                chatObj.Message = model.Message;
                chatObj.AgencyID = model.AgencyID;
                chatObj.Token = model.Token;
                chatObj.CreatedDate = DateTime.Now;
                chatObj.IsActive = true;
                chatObj.IsDeleted = false;
                dataContext.ChatPrivateMessageDetails.Add(chatObj);
                dataContext.SaveChanges();
            }
            catch (Exception ex)
            {
                res.StatusCode = 987;
                res.Message = "Something went wrong.";
                res.IsSuccess = false;
                res.ReturnMessage.Add(ex.ToString());
            }

            await SendMessageToAllAsync(message);
        }
    }
}
