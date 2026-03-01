using System.Text.Json;
using System.Text.Json.Serialization.Metadata;
using AccelokaSandy.Application.Features.Tickets.Dtos;

public class TicketPolymorphicResolver : DefaultJsonTypeInfoResolver
{
    public override JsonTypeInfo GetTypeInfo(Type type, JsonSerializerOptions options)
    {
        var info = base.GetTypeInfo(type, options);

        if (type == typeof(ITicketDto))
        {
            info.PolymorphismOptions = new JsonPolymorphismOptions
            {
                TypeDiscriminatorPropertyName = "$type"
            };

            info.PolymorphismOptions.DerivedTypes.Add(
                new JsonDerivedType(typeof(TicketDto), typeDiscriminator: "ticket")
            );

            info.PolymorphismOptions.DerivedTypes.Add(
                new JsonDerivedType(typeof(FlightTicketDto), typeDiscriminator: "flight")
            );
        }

        return info;
    }
}