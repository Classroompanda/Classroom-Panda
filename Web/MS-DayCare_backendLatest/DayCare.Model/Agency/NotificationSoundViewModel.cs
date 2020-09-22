using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Agency
{
    public class NotificationSoundViewModel : BaseViewModel
    {
        public long Id { get; set; }

        public long UserID { get; set; }

        public string OnOff { get; set; }

        public long StringId { get; set; }

    }
}

