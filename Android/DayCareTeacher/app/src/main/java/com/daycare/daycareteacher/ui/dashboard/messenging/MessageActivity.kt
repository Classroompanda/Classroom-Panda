package com.daycare.daycareteacher.ui.dashboard.messenging

import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.Toolbar
import androidx.core.text.HtmlCompat
import androidx.databinding.DataBindingUtil
import androidx.lifecycle.Observer
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.daycare.daycareteacher.R
import com.daycare.daycareteacher.databinding.ActivityMessageBinding
import com.daycare.daycareteacher.model.ChatHistoryModel
import com.daycare.daycareteacher.model.ChatListData
import com.daycare.daycareteacher.model.LoginResponse
import com.daycare.daycareteacher.repository.ResponseCodes
import com.daycare.daycareteacher.utill.*
import com.google.gson.GsonBuilder
import com.smartarmenia.dotnetcoresignalrclientjava.*
import kotlinx.android.synthetic.main.activity_message.*

class MessageActivity : AppCompatActivity(), HubConnectionListener, HubEventListener {

    lateinit var binding: ActivityMessageBinding
    lateinit var viewModel: MessageViewModel
    private lateinit var toolbar: Toolbar
    private val list = ArrayList<ChatHistoryData>()
    private lateinit var listAdapter: ChatAdapter
    var loader = Loader()
    var userData: LoginResponse.Data? = LoginResponse().Data()
    lateinit var recyclerView: RecyclerView
    var otherUser = ChatListData()
   private val connection: HubConnection = WebSocketHubConnectionP2("https://schoolpandaapp.azurewebsites.net/chat", "")
  //  private val connection: HubConnection = WebSocketHubConnectionP2("https://www.stagingwin.com:9943/chat", "")

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.activity_message)
        viewModel = MessageViewModel()
        //userData = AppInstance.loginResponse?.data
        userData=AppInstance.getUser(this)
        //PreferenceConnector.readUser(this@MessageActivity, PreferenceConnector.USER)
        //Connection to SignalR
        connection.addListener(this)
        connection.subscribeToEvent("messageReceived", this)

        otherUser = intent.getParcelableExtra<ChatListData>("user")
        setAdapter(otherUser)
        setToolbar()

        viewModel.getChatHistory(this, otherUser)
        attachObserver()

        binding.sendMsg.setOnClickListener {
            if (!binding.chatMsg.text.isNullOrEmpty()) {
                val data = ChatData()
                data.agencyID = userData?.agencyID
                data.message = binding.chatMsg.text.toString()
                data.senderUserID = userData?.loginUserID
                data.receiverUserID = otherUser.listUserId


//                data.agencyID = null
//                data.message = binding.chatMsg.text.toString()
//                data.senderUserID = null
//                data.receiverUserID = otherUser.listUserId


//            val msg = toJsonString(data)
                try {
                    connection.invoke(
                        "sendMessage",
                        "",
                        data.message,
                        data.agencyID,
                        data.senderUserID,
                        data.receiverUserID
                    )

                } catch (e: Exception) {
                    Toast.makeText(this, e.message, Toast.LENGTH_SHORT).show()
                }

                //list.add(data)
                listAdapter.notifyDataSetChanged()
                binding.chatMsg.text.clear()
                hideVirtualKeyboard(this@MessageActivity)

            }
        }
    }

    override fun onStart() {
        super.onStart()
        connect()
    }

    override fun onResume() {
        super.onResume()
        connect()
    }

    /**
     * connect method
     */

    private fun connect() {
        try {

            connection.subscribeToEvent("messageReceived", this)
            connection.connect()
        } catch (ex: Exception) {

            runOnUiThread { Toast.makeText(this, ex.message, Toast.LENGTH_SHORT).show() }
        }
    }

    /**
     * Unsubscribe all events and listeners on destroy
     */

    override fun onDestroy() {
        super.onDestroy()
        connection.removeListener(this)
        connection.unSubscribeFromEvent("messageReceived", this)
        connection.disconnect()
    }

    private fun setToolbar() {
        toolbar = binding.includeToolbar
        toolbar.setNavigationIcon(R.drawable.ic_arrow_back_24dp)
        toolbar.setNavigationOnClickListener { finish() }

        headerTxt.text = otherUser.listUserName//AppInstance.getUser(this)?.firstName +" "+AppInstance.getUser(this)?.lastName
    }

    private fun setAdapter(data: ChatListData) {
//        ChatAdapter
        recyclerView = binding.recyclerView
        recyclerView.layoutManager =
            LinearLayoutManager(
                this,
                RecyclerView.VERTICAL,
                false
            )
        binding.recyclerView.layoutManager = recyclerView.layoutManager
        listAdapter = ChatAdapter(this, list, data)
        binding.recyclerView.adapter = listAdapter
        recyclerView.scrollToPosition(list.size - 1)
    }

    private fun attachObserver() {
        viewModel.chatHistory.observe(this, Observer<ChatHistoryModel> { it ->
            it?.let {
                if (it.statusCode == ResponseCodes.Success) {
                    it.data?.let { it1 ->
                        list.addAll(it1)
                        listAdapter.notifyDataSetChanged()
                        recyclerView.scrollToPosition(list.size - 1)

                    }
                }
            }
        })
        viewModel.isLoading.observe(this, Observer<Boolean> { it ->
            it?.let {
                if (it) {
                    loader.startLoader(this)
                } else {
                    loader.stopLoader()
                }
            }

        })
    }

    override fun onConnected() {
        connection.invoke("getConnectionId", userData?.loginUserID)
        runOnUiThread {  Log.e("Connected","Connected") }
    }

    override fun onMessage(message: HubMessage?) {
        runOnUiThread {
            try {
                if (message?.arguments?.size!! > 0) {
                    val data = HtmlCompat.fromHtml(message.arguments[1].asString,0) //message.arguments[1].toString()
                    var d:String?=null
                    if(data.contains("\n")){
                        d= data.toString().replace("\n"," ")
                    }else{
                        d=data.toString()
                    }
                    val gson = GsonBuilder().create()
                    val chatData = gson.fromJson(d, ChatData::class.java)
                    Log.e("data", chatData.toString())
                    if (chatData.senderUserID == otherUser.listUserId || chatData.senderUserID == userData?.loginUserID) {
                        var message = chatData.message?.let { HtmlCompat.fromHtml(it, 0) }.toString()
                        list.add(
                            ChatHistoryData(
                                chatData.senderUserID, chatData.receiverUserID, message,//chatData.message,
                                convertDate(getCurrentDate(), displayDate, alohaDate)
                            )
                        )
                        listAdapter.notifyDataSetChanged()
                        recyclerView.scrollToPosition(list.size - 1)
                    }else{
                        //show notification
                    }

                }

            } catch (e: Exception) {
                Log.e("Exception", e.toString())
            }

        }
    }

    override fun onDisconnected() {
        runOnUiThread { Log.e("Disconnected","Disconnected") }
    }

    override fun onError(exception: Exception?) {
        runOnUiThread {  Log.e("Error","$exception") }
    }

    override fun onEventMessage(message: HubMessage?) {
        runOnUiThread {
//            Toast.makeText(
//                this,
//                "Event message: ${message?.target}\n${Gson().toJson(message?.arguments)}",
//                Toast.LENGTH_SHORT
//            ).show()
            Log.e("Event Message","$message")
        }
    }
}

