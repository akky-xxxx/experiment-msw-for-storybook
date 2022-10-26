module.exports = {
  roots: ["<rootDir>/spec"],
  transform: {
    "^.+\\.ts$": [
      "@swc/jest",
      {
        sourceMaps: true, // エラーを見やすくする( 有効じゃないと内容がズレて表示されます )

        module: {
          type: "commonjs", // 出力するファイルをcommonjsとする
        },

        jsc: {
          parser: {
            syntax: "typescript", // ソースコードをtypescriptとしてパースする
          },
        },
      },
    ],
  },
  testMatch: ["**/?(*.)test.ts?(x)", "!**/server/**"],
  testEnvironment: "jsdom",
}
