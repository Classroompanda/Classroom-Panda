using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model.Master
{
    public class ActivityNotificationViewModel
    {

        public long activityId { get; set; } 
        public string activityName { get; set; }
        public string gongEnableStatement { get; set; }
        public string gongDisableStatement { get; set; }
        public string notificationStatement { get; set; }

    }
}
