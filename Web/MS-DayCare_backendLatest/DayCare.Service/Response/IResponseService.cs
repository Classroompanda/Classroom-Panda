using DayCare.Model.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace DayCare.Service.Response
{
    public interface IResponseService
    {
        JsonModel ExceptionResponse(Exception ex);
    }
}
