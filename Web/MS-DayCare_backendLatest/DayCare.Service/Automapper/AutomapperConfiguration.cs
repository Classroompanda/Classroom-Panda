using AutoMapper;

namespace DayCare.Service.Automapper
{
    public class AutomapperConfiguration
    {
        public static void Configure()
        {
            Mapper.Initialize(x => x.AddProfile(new MapperProfileConfiguration()));
        }
    }
}
