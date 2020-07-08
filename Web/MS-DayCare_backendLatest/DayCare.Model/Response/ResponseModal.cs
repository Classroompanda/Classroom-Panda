using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Model
{
   public class ResponseModal
    {
        public bool ReturnStatus { get; set; }
        public List<string> ReturnMessage { get; set; }
        //public Hashtable ValidationErrors;
        public string EmailValidation { get; set; }
        public long TotalPages;
        public long TotalRows;
        public long PageSize;
        public long ID;
        public bool IsExist;

        public ResponseModal()
        {
            ID = 0;
            ReturnMessage = new List<string>();
            ReturnStatus = true;
            //ValidationErrors = new Hashtable();
            TotalPages = 0;
            TotalPages = 0;
            PageSize = 0;
            IsExist = false;
        }
    }
}
