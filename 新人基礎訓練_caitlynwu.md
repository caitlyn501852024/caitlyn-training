#### 1. JavaScript 程式開發

- 環境設定
    1. Node.js 和 npm 是什麼
        - Node.js 是基於 JavaScript 的執行環境，使 JavaScript 可以在除了網頁瀏覽器之外的環境執行。
        - npm (Node Package Manager) 是 Node.js 預設的套件管理工具。
    2. 為什麼要使用 Node.js 和 npm
        - 原生的 JavaScript 只能在網頁瀏覽器上執行，造成使用上有所限制。安裝 Node.js 後，在除了網頁瀏覽器之外的環境也可以直接執行 JavaScript，擴展了可用性。
        - 使用 npm 可以方便的管理專案有使用到的套件，也可以很方便的安裝相關的相依套件。

    - 如何在本地安裝 `Node.js` 與 `npm`
        - 至 Node.js 官網下載頁面 (https://nodejs.org/zh-tw/download)，選擇 LTS 版本 (截至撰寫時為 v22.17.1 版)，直接選擇下方 `下載 Windows 安裝程式` 並執行，跟隨安裝指引的步驟安裝即可。
        - 安裝完成後，開啟 Windows 的命令提示字元，輸入指令 `node -v`，若有安裝成功，會顯示安裝的 Node.js 版本號碼。
        - 安裝 Node.js 時就會同時安裝 npm。
        - 開啟 Windows 的命令提示字元，輸入指令 `npm -v`，即可查看安裝的 npm 版本號碼。

    - 使用 `npm` 初始化專案 (package.json)
        - 開啟命令提示字元，使用 cd 指令將執行位置移到專案資料夾根目錄，輸入指令 `npm init` (需手動輸入專案資訊) 或 `npm init -y` (直接套用預設設定)，可以建立 package.json 檔案。
        - package.json 檔案會在安裝套件時，寫入並記錄專案有使用的套件及套件版本資訊。這個檔案需一起進入 git 版本控制。
        - 安裝的套件會存在 node_modules 資料夾中，但這個資料通常不會進版控，因此當從雲端儲存庫 clone 專案至本機後，需先使用 npm 指令安裝專案所使用的套件，專案才能正常在本機執行。
        - 使用編輯器開啟專案後，開啟終端機，並確認執行位置在專案根目錄後，輸入指令 `npm i` (完整指令為 `npm install`)，會自動根據上述的 package.json 檔案，開始安裝必要套件。

    - 如何確認當前所在的專案環境 (使用 node -v 和 npm -v 確認版本)
        - 開啟命令提示字元，使用 cd 指令將執行位置移至專案所在資料夾根目錄後，分別輸入 `node -v` 和 `npm -v` 指令，即可確認安裝的 node.js 和 npm 版本。
        - 也可以使用 nvm 管理 node 版本。

    - 全域安裝與專案安裝套件
        - 可以到 npm 網站 (https://www.npmjs.com/) 搜尋及安裝需要的套件。找到需要的套件後，可參考頁面上提供的安裝指令，使用終端機輸入指令進行安裝。
        - 例如專案要使用 Bootstrap 套件，使用編輯器開啟專案資料夾後，開啟終端機並確認執行位置在專案資料夾根目錄。接著在終端機輸入指令 `npm i bootstrap`，便會自動開始安裝。
        - 安裝套件時，有分成「全域安裝」與「專案安裝」，全域安裝的指令為 `npm i <套件名稱> -g`，會將套件安裝在電腦本機中，而不是專案底下的 node_modules 資料夾，同時不會出現在 package.
          json 檔案中。
        - 安裝套件時若直接輸入 `npm i <套件名稱>` 或使用 `npm i <套件名稱> --save` (產品上線使用)、`npm i <套件名稱> --save-dev` (開發使用) 指令則為專案安裝，會將套件安裝在專底下的 node_modules 資料夾，也會在 package.json 檔案中記錄套件名稱和版本資訊。

    - 如何設定與使用 `.env` 環境變數
        - `.env` 環境變數檔案可以存放較敏感、不公開的設定與資料，例如金鑰、伺服器連線參數等，除了便於管理，且因環境變數檔案通常不會進入版控，因此能維持專案環境設定的安全性。
        - 可以直接在專案根目錄新增一個 `.env` 檔案，存入專案所需的環境變數設定，並在專案程式碼中引入使用環境變數檔案。

- 開發工具
    - 常見的 JavaScript 開發工具與 IDE (WebStorm)
        - 快速尋找方法或參數的「源頭」或是「有哪些方法在使用」
          - 
        - 快速 reformat 程式碼
          - 為了讓程式碼更具可讀性、美觀與便於團隊共同維護，因此需要維持專案程式碼的格式一致與標準化。
          - 可以使用如 prettier 等格式化插件，並搭配鍵盤快捷鍵，即可快速方便的將程式碼格式化。這類插件通常也會提供自定義設定，可針對不同檔案格式或團隊習慣做設定，使專案中的檔案格式統一。

#### 2. JavaScript 基本練習

- 資料結構
    - Array (陣列)
        - 說明什麼是Array (定義、特性、用途等)，如何建立一個Array
        - 常見的陣列方法：`push()`, `pop()`, `shift()`, `unshift()`, `concat()`, `join()`, `slice()`, `splice()`,
          `map()`, `filter()`, `sort()` 等
        - Array Destructuring
    - Object (物件)
        - 說明什麼是Object (定義、特性、用途等)，如何建立一個Object
        - 常見的物件方法：`Object.keys()`, `Object.values()`, `Object.entries()`, `Object.assign()`, `Object.create()` 等
        - Object Destructuring
    - Set (集合)
        - 什麼是Set (定義、特性、用途等)，如何建立一個Set
        - 常見的Set方法：`add()`, `delete()`, `has()`, `clear()`, `intersection()`, `union()` 等
    - Map
        - 說明什麼是Map (定義、特性、用途等)，如何建立一個Map
        - 常見的Map方法：`set()`, `get()`, `delete()`, `has()`, `clear()`, `keys()`, `values()`, `entries()` 等
- Function (函式 or 函數 or 方法)
    - 普通函數與箭頭函數
        - `函數宣告(Function Declaration)` 與 `表達式 (Function Expression)`
        - 箭頭函數(Arrow Function)：箭頭函數與 `this` 的關係
    - 函數參數與回傳值
        - 預設參數、剩餘參數 (Rest parameters)、解構參數
        - return 與 yield
    - Scope 與 Closure
- 常見工具與方法
    - typeof 和 instanceof 運算符

#### 3. JavaScript 進階練習

- Package 與 Module
    - 什麼是 Package 與 Module
    - 如何使用 `import` 與 `export` 來引入與匯出模組
- Promise 與 Async/Await
    - 說明什麼是Promise，以及如何使用它
    - 說明如何使用 `async` 與 `await` 進行非同步操作的處理
    - 異常處理 (try...catch)與實踐原則
- 非同步操作與事件循環
    - 事件循環 (Event Loop) 的概念
    - 說明 `setTimeout` 與 `setInterval` 的概念與使用
    - 如何理解 `callback` 和 `Promise` 的區別與優勢
- 提升 (Hoisting)
    - JavaScript 的提升是什麼意思
    - `var`, `let` 與 `const` 的提升
    - `function` 的提升

#### 4. JavaScript 延伸練習

- 日誌與異常處理
    - log 類型的介紹 (console.log, console.error, console.warn, console.info)
    - 使用套件 `winston` 進行日誌記錄
- 命名慣例
    - Package
    - Module
    - Variable
    - Constant
    - Function
    - Class
    - Event Handler

### git

- 什麼是 git
- 如何建立 git repository
    - 全新的專案
    - 已經有使用 git 版控的專案
- .gitignore 的意義
- 如何進行提交 (commit)
- 檔案還原
- 如何切換 branch
- 何為衝突 (conflict)
    