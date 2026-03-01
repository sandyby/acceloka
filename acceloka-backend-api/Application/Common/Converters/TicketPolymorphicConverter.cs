using System.Runtime.Serialization;
using Newtonsoft.Json;

public class TicketPolymorphicConverter<TBase> : JsonConverter
{
    private readonly Dictionary<string, Type> _derivedTypes;
    public TicketPolymorphicConverter()
    {
        _derivedTypes = typeof(TBase).Assembly.GetTypes().Where(t => typeof(TBase).IsAssignableFrom(t) && !t.IsInterface && !t.IsAbstract).ToDictionary(t => t.Name, t => t);
    }

    public override bool CanConvert(Type objectType)
    {
        return typeof(TBase).IsAssignableFrom(objectType);
    }

    public override void WriteJson(JsonWriter writer, object? value, JsonSerializer serializer)
    {
        if (value == null)
        {
            writer.WriteNull();
            return;
        }
        var realType = value.GetType();
        var settings = NewtonsoftJsonSerializerSettings.AccelokaDefaultJsonSerializerSettings();
        var tempSerializer = JsonSerializer.Create(settings);
        tempSerializer.Serialize(writer, value, realType);
    }

    public override object? ReadJson(JsonReader reader, Type objectType, object? existingValue, JsonSerializer serializer)
    {
        throw new NotImplementedException();
    }
}