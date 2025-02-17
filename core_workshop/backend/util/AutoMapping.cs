using AutoMapper;
using backend.Models;
using backend.ViewModels;

public class AutoMapping : Profile
{
    public AutoMapping()
    {
        CreateMap<LoginViewModel, User>(); // map from UserViewModel to Users
        // CreateMap<RegisterViewModel, User>(); // map from RegisterViewModel to Users
        CreateMap<ProductViewModel, Product>(); // map from ProductViewModel to Product
    }
}
