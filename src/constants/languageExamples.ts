export const languageExamples = {
  javascript: {
    "Hello World": `console.log("Hello, World!");`,
    Fibonacci: `function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// 测试
for (let i = 0; i < 10; i++) {
    console.log(fibonacci(i));
}`,
  },
  typescript: {
    "Hello World": `function greet(name: string): string {
    return \`Hello, \${name}!\`;
}

console.log(greet("TypeScript"));`,
    Fibonacci: `function fibonacci(n: number): number {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// 测试
for (let i = 0; i < 10; i++) {
    console.log(fibonacci(i));
}`,
  },
  python: {
    "Hello World": `print("Hello, World!")`,
    Fibonacci: `def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

# 测试
for i in range(10):
    print(fibonacci(i))`,
  },
  lua: {
    "Hello World": `print("Hello, World!")`,
    Fibonacci: `function fibonacci(n)
    if n <= 1 then
        return n
    end
    return fibonacci(n - 1) + fibonacci(n - 2)
end

-- 测试
for i = 0, 9 do
    print(fibonacci(i))
end`,
  },
  go: {
    "Hello World": `package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`,
    Fibonacci: `package main

import "fmt"

func fibonacci(n int) int {
    if n <= 1 {
        return n
    }
    return fibonacci(n-1) + fibonacci(n-2)
}

func main() {
    for i := 0; i < 10; i++ {
        fmt.Println(fibonacci(i))
    }
}`,
  },
  rust: {
    "Hello World": `fn main() {
    println!("Hello, World!");
}`,
    Fibonacci: `fn fibonacci(n: u32) -> u32 {
    if n <= 1 {
        return n;
    }
    fibonacci(n - 1) + fibonacci(n - 2)
}

fn main() {
    for i in 0..10 {
        println!("{}", fibonacci(i));
    }
}`,
  },
} as const;

export type LanguageType = keyof typeof languageExamples;
export type ExampleType<T extends LanguageType> =
  keyof (typeof languageExamples)[T];
