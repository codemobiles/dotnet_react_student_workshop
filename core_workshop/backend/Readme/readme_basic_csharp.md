# Basic C#
- public class
- data type
- props
- optional variable
- const vs readonly


# Class
```cs
public class Item
    {
        public string? name { get; set; }
        public double? price { get; set; }
        public int? stock { get; set; }
    }


    public class Student {
        public string name { get; set; } = "Untitled";
        public int age { get; set; } = 0;

        public Student(string name, int age){
            this.name = name;
            this.age = age;
        }
    }
```cs

## Data Types

```cs
using System;

class Program
{
    static void Main()
    {
        // Value Types
        int integer = 42;
        float floatingPoint = 3.14f;
        double doublePrecision = 2.71828;
        decimal highPrecision = 100.25m;
        bool boolean = true;
        char character = 'A';

        // Reference Types
        string text = "Hello, World!";
        object obj = 42;
        int[] array = { 1, 2, 3, 4, 5 };

        // Display values
        Console.WriteLine("Integer: " + integer);
        Console.WriteLine("Float: " + floatingPoint);
        Console.WriteLine("Double: " + doublePrecision);
        Console.WriteLine("Decimal: " + highPrecision);
        Console.WriteLine("Boolean: " + boolean);
        Console.WriteLine("Character: " + character);
        Console.WriteLine("String: " + text);
        Console.WriteLine("Object: " + obj);
        Console.WriteLine("Array: " + string.Join(", ", array));
    }
}
```

## props
- props (tap to automate)

## const vs readonly
```cs
    public const double Pi = 3.14159;

    // In C#, const and readonly are used to define fields that cannot be modified after they are initialized. However, there are key differences between them in terms of usage, initialization, and mutability.
      // Readonly field
    public readonly int BirthYear;

    // Constructor
    public ReadOnlyExample(int year)
    {
        BirthYear = year;
    }

```

## optional variable
```cs
 string? name = null;
 name = "Kan"
```
