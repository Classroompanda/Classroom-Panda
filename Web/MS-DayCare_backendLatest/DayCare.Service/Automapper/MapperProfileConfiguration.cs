using AutoMapper;
using DayCare.Entity.Masters;
using DayCare.Entity.User;
using DayCare.Model.Master;
using DayCare.Model.User;

namespace DayCare.Service.Automapper
{
    public class MapperProfileConfiguration : Profile
    {
        public MapperProfileConfiguration()
        {
            CreateMap<Users, UserModel>();
            CreateMap<UserModel, Users>();
            CreateMap<DigitalDirectorMasterViewModel, DigitalDirectorMaster>().ReverseMap();
        }
    }
}
