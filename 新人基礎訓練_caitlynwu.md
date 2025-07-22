#### 1. JavaScript 程式開發

- 環境設定
    - Node.js 和 npm 是什麼
        - Node.js 是基於 JavaScript 的執行環境，使 JavaScript 可以在除了網頁瀏覽器之外的環境執行。
        - npm (Node Package Manager) 是 Node.js 預設的套件管理工具。
    - 為什麼要使用 Node.js 和 npm
        - 原生的 JavaScript 只能在網頁瀏覽器上執行，造成使用上有所限制。安裝 Node.js 後，在除了網頁瀏覽器之外的環境也可以直接執行
          JavaScript，擴展了可用性。
        - 使用 npm 可以方便的管理專案有使用到的套件，也可以很方便的安裝相關的相依套件。

    - 如何在本地安裝 `Node.js` 與 `npm`
        - 至 Node.js 官網下載頁面 (https://nodejs.org/zh-tw/download)，選擇 LTS 版本 (截至撰寫時為 v22.17.1 版)，直接選擇下方
          `下載 Windows 安裝程式` 並執行，跟隨安裝指引的步驟安裝即可。
        - 安裝完成後，開啟 Windows 的命令提示字元，輸入指令 `node -v`，若有安裝成功，會顯示安裝的 Node.js 版本號碼。
        - 安裝 Node.js 時就會同時安裝 npm。
        - 開啟 Windows 的命令提示字元，輸入指令 `npm -v`，即可查看安裝的 npm 版本號碼。

    - 使用 `npm` 初始化專案 (package.json)
        - 開啟命令提示字元，使用 cd 指令將執行位置移到專案資料夾根目錄，輸入指令 `npm init` (需手動輸入專案資訊) 或
          `npm init -y` (直接套用預設設定)，可以建立 package.json 檔案。
        - package.json 檔案會在安裝套件時，寫入並記錄專案有使用的套件及套件版本資訊。這個檔案需一起進入 git 版本控制。
        - 安裝的套件會存在 node_modules 資料夾中，但這個資料夾內容通常不會進版控，因此當從雲端儲存庫 clone 專案至本機後，需先使用
          npm 指令安裝專案所使用的套件，專案才能正常在本機執行。
        - 使用編輯器開啟專案後，開啟終端機，並確認執行位置在專案根目錄後，輸入指令 `npm i` (完整指令為 `npm install`)
          ，會自動根據上述的 package.json 檔案，開始安裝必要套件。

    - 如何確認當前所在的專案環境 (使用 node -v 和 npm -v 確認版本)
        - 使用編輯器開啟專案資料夾後，開啟終端機並確認執行位置在專案資料夾根目錄，分別輸入 `node -v` 和 `npm -v` 即可查看安裝的
          node.js 和 npm 版本。
        - 可以使用 nvm 管理 node 版本。

    - 全域安裝與專案安裝套件
        - 可以到 npm 網站 (https://www.npmjs.com/) 搜尋及安裝需要的套件。找到需要的套件後，可參考頁面上提供的安裝指令，使用終端機輸入指令進行安裝。
        - 例如專案要使用 Bootstrap 套件，使用編輯器開啟專案資料夾後，開啟終端機並確認執行位置在專案資料夾根目錄。接著在終端機輸入指令
          `npm i bootstrap`，便會自動開始安裝。
        - 安裝套件時，有分成「全域安裝」與「專案安裝」，全域安裝的指令為 `npm i <套件名稱> -g`，會將套件安裝在電腦本機中，而不是專案底下的
          node_modules 資料夾，同時不會出現在 package.json 檔案中。
        - 安裝套件時若直接輸入 `npm i <套件名稱>` 或使用 `npm i <套件名稱> --save` (產品上線使用)、
          `npm i <套件名稱> --save-dev` (開發使用) 指令則為專案安裝，會將套件安裝在專底下的 node_modules 資料夾，也會在
          package.json 檔案中記錄套件名稱和版本資訊。

    - 如何設定與使用 `.env` 環境變數
        - `.env` 環境變數檔案可以存放較敏感、不公開的設定與資料，例如金鑰、伺服器連線參數等，除了便於管理，且因環境變數檔案通常不會進入版控，因此能維持專案環境設定的安全性。
        - 可以直接在專案根目錄新增一個 `.env` 檔案，存入專案所需的環境變數設定，並在專案程式碼中引入使用環境變數檔案。

- 開發工具
    - 常見的 JavaScript 開發工具與 IDE (WebStorm)
        - 快速尋找方法或參數的「源頭」或是「有哪些方法在使用」
            - 將要查找的方法或變數選取起來後，將滑鼠懸停在上方，此時會彈出小提示框，點選放大鏡可以查看有使用到的地方。
            - 也可以直接點選 IDE 右上角的放大鏡，會一次將所有有使用到的地方顯示出來，顯示在最上面的則是參數或方法被宣告的地方。
        - 快速 reformat 程式碼
            - 為了讓程式碼更具可讀性、美觀與便於團隊共同維護，因此需要維持專案程式碼的格式一致與標準化。
            - 可以使用如 prettier 等格式化插件，並搭配鍵盤快捷鍵，即可快速方便的將程式碼格式化。這類插件通常也會提供自定義設定，可針對不同檔案格式或團隊習慣做設定，使專案中的檔案格式統一。

#### 2. JavaScript 基本練習

- 資料結構
    - Array (陣列)
        - 說明什麼是 Array (定義、特性、用途等)，如何建立一個 Array
            - 陣列 (Array) 是一組有順序 (索引 index) 的資料，由 `[]` 包覆，其中可以放入任何資料類型，也不限制每個元素必須是相同資料型別。
            - 使用陣列的好處是可以只使用一個變數，就能儲存並管理大量的資料，也能使用各種遍歷方法對大量資料做操作。
            - 要建立一個陣列，可以先宣告一個變數後，將資料內容以 `[]` 包覆賦值，每個元素間使用 `,` 分隔。也可以使用
              `new Array()` 來建立一個新的陣列。
              ```javascript
              // 建立陣列：宣告變數並用 [] 將陣列內容括起來，每個元素中間使用 , 分隔。
              const arr1 = [0, 4, 6, 50, 99];
              const arr2 = ['Mike', 'Tim', 'Vicky'];
              const arr3 = ['cat', 22, 5, 'hello'];
              
              console.log(arr1); // [0, 4, 6, 50, 99]
              console.log(arr2); // ['Mike', 'Tim', 'Vicky']
              console.log(arr3); // ['cat', 22, 5, 'hello']
              
              // 使用 new Array() 建立陣列
              const arr4 = new Array(); // [] 空陣列
              const arr5 = new Array(3); // 陣列長度為 3，內容為 3 個 undefined 空元素
              const arr6 = new Array(3).fill(1); // [1, 1, 1]，陣列長度為 3
              const arr7 = new Array(1, 2, 3); // [1, 2, 3]，陣列長度為 3
              
              console.log(arr4); // []
              console.log(arr5); // [<3 empty items>]
              console.log(arr6); // [1, 1, 1]
              console.log(arr7); // [1, 2, 3]
              ```

        - 常見的陣列方法：
            - `push()`：從陣列的尾端加入元素值，會改動到原本陣列。
              ```javascript
              // Array.push()
              const arr8 = [1, 7, 16, 25, 65];
              arr8.push(37);
              console.log(arr8); // [1, 7, 16, 25, 65, 37]
              ```
            - `pop()`：從陣列的尾端取出元素值，會改動到原本陣列。
              ```javascript
              // Array.pop()`
              const arr9 = [3, 97, 20, 10];
              arr9.pop();
              console.log(arr9); // [3, 97, 20]
              ```
            - `shift()`：從陣列的最前端取出元素值，會改動到原本陣列。
              ```javascript
              // Array.shift()`
              const arr10 = [41, 25, 63, 10, 5];
              arr10.shift();
              console.log(arr10); // [25, 63, 10, 5]
              ```
            - `unshift()`：從陣列的最前端加入元素值，會改動到原本陣列。
              ```javascript
              // Array.unshift()`
              const arr11 = [23, 34, 12, 76];
              arr11.unshift(99);
              console.log(arr11); // [99, 23, 34, 12, 76]
              ```
            - `concat()`：串接陣列，並建立一個新的陣列，不會改動到原本陣列。
              ```javascript
              // Array.concat()`
              const arr12 = arr10.concat(arr11);
              console.log(arr12); // [25, 63, 10, 5, 99, 23, 34, 12, 76]
              ```
            - `join([黏著符號])`：以可自訂的黏著符號串接成字串，不會改動到原本陣列。
              ```javascript
              // Array.join([黏著符號])`
              const arr13 = ['it', 'is', 'hot', 'today'];
              const str = arr13.join('?');
              console.log(str); // 'it?is?hot?today'
              ```
            - `slice(索引 a, 索引 b)`：複製一個從索引 a 開始到索引 b 前的陣列（含 a 不含 b），不會改動到原本陣列。
              ```javascript
              // Array.slice(索引 a, 索引 b)`
              const arr14 = [3, 8, 11, 65, 10, 45, 65];
              const arr15 = arr14.slice(2, 5);
              console.log(arr14); // [3, 8, 11, 65, 10, 45, 65]
              console.log(arr15); // [11, 65, 10]
              ```
            - `splice(索引位置, 數量, [加入元素])`：可以在指定的索引位置刪除和加入元素，會改動到原本陣列。
              ```javascript
              // Array.splice(索引位置, 數量, [加入元素])`
              const arr16 = [1, 2, 3, 4, 5, 6, 7, 8];
              arr16.splice(3, 3, 99);
              console.log(arr16); // [1, 2, 3, 99, 7, 8]
              ```
            - `map()`：使陣列中的每個元素執行函式處理後，回傳一個新的陣列，需要回傳值，不會改動到原本陣列。若沒有回傳值，會回傳
              `undefined`。
              ```javascript
              // Array.map()`
              const arr17 = [1, 2, 3, 4, 5];
              const arr18 = arr17.map(function (n) {
                  return n + 3;
              })
              console.log(arr18); // [4, 5, 6, 7, 8]
              
              // 也可使用箭頭函式簡化寫法
              const arr19 = arr17.map(n => n * 2);
              console.log(arr19); // [2, 4, 6, 8, 10]
              ```
            - `filter()`：使陣列中的每個元素執行函式處理後，將結果為 `true` 的回傳成一個新的陣列，不會改動到原本陣列。
              ```javascript
              // Array.filter()`
              const arr20 = arr17.filter(function (n) {
              return n <= 3;
              })
              console.log(arr20); // [1, 2, 3]
              
              // 一樣可以使用箭頭函式簡化寫法
              const arr21 = arr17.filter(n => n > 3);
              console.log(arr21); // [4, 5]
              ```
            - `sort()`：將陣列內容重新排序並回傳。若沒有自訂排序所用的參數，預設排序方式會將資料內容轉換成字串並以 unicode
              編碼排序。會改動到原本陣列。
              ```javascript
              // Array.sort()`
              // 預設排序
              const arr22 = [22, 3, 15, 9, 67, 34, 55];
              arr22.sort();
              console.log(arr22); // [15, 22, 3, 34, 55, 67, 9]
              
              // 自訂排序：給 a 和 b 兩個參數，若函式執行結果回傳 > 0，則將 b 往前移；若 < 0 則將 a 往前移，若 = 0 則不動。
              // 正序排列
              const arr23 = [22, 3, 15, 9, 67, 34, 55];
              arr23.sort((a, b) => a - b);
              console.log(arr23); // [3, 9, 15, 22, 34, 55, 67]
              // 反序排列
              const arr24 = [22, 3, 15, 9, 67, 34, 55];
              arr24.sort((a, b) => b - a);
              console.log(arr24); // [67, 55, 34, 22, 15, 9, 3]
              ```

        - Array Destructuring
            - 從 ES6 開始，可以使用解構方式為陣列賦值，可以方便的將資料提取出來並賦值。
            - 類似鏡像或映射的概念，一個變數對應一個資料。如果變數數量多於資料數量，該變數值會是
              undefined；如果變數數量少於資料數量，則只會賦值給有使用的變數，其他資料不受影響。
            ```javascript
            // 基本的解構賦值
            // 變數與資料數量相同
            const arr25 = ['Mark', 'David', 'Cindy', 'Leo', 'Mary'];
            const [p1, p2, p3, p4, p5] = arr25;
            console.log(p1, p2, p3, p4, p5); // p1 = 'Mark', p2 = 'David', p3 = 'Cindy', p4 = 'Leo', p5 = 'Mary'
            
            // 變數與資料數量不同
            const arr26 = ['Andy', 'John'];
            const [p6, p7, p8] = arr26;
            const [p9] = arr26;
            console.log(p6, p7, p8); // p6 = 'Andy', p7 = 'John', p8 = undefined
            console.log(p9); // 'Andy'  
          
            // 延伸：其餘運算子
            const [a, ...b] = [1, 2, 3]
            console.log(a, b); // a = 1, b = [2, 3]
            
            // 延伸：交換變數
            let c = 1;
            let d = 2;
            [c, d] = [d, c];
            console.log(c, d); // c = 2, d = 1
            ```

    - Object (物件)
        - 說明什麼是 Object (定義、特性、用途等)，如何建立一個 Object
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
    - 為了專案統一風格、方便維護管理及提升程式碼的可讀性，不同的資料型態會有各自慣用的命名規則。
      - JavaScript 通用的命名規則
        - 不可使用 JavaScript 的保留字。
        - 名稱開頭需使用字母、下底線 (_) 或錢字號 ($)，不可使用數字作為開頭。以下底線或錢字號開頭通常為特殊變數使用。
        - 名稱開頭以外，可使用字母、下底線、錢字號和數字。
        - 大小寫有差異。
        - 盡量使用語意化、好辨識的名稱。
      - Package
        - 全小寫命名，通常使用公司或組織名稱作為前綴，單詞間以 `.` 連接。
        - 名稱通常包含以下項目：
          - 公司或團體名稱
          - 系統名稱
          - 模組名稱
          - 功能名稱
          - 功能分類項目
        - 例：`com.company.core.common`。
      - Module
        - 根據 module 的類型使用不同命名方式。
      - Variable
        - 使用「小駝峰 (camelCase)」命名，首字母小寫，後續單詞的首字母大寫。
        - 例：`userName`。
      - Constant
        - 使用全大寫命名，單詞之間以底線連接。
        - 例：`PI`、`MAX_VALUE`。
      - Function
        - 使用「小駝峰 (camelCase)」，首字母小寫，後續單詞的首字母大寫。
        - 例：`addItem`。
      - Class：
        - 使用「大駝峰 / 帕斯卡 (Pascal Case)」命名，首字母及後續單詞的首字母皆大寫。
        - 例：`MyClassName`。
      - Event Handler：
        - 使用「小駝峰 (camelCase)」命名，首字母小寫，後續單詞的首字母大寫，並通常搭配「動詞 + 名詞」方式命名。
        - 例：`onInputChange`、`handleClickButton`。

### git

- 什麼是 git
  - git 是一種分散式版本控制系統，可以追蹤檔案的變動、方便管理檔案版本及團隊協作。
  - 
  在開發或維護專案時，由於會非常頻繁的新增或刪改程式碼或資料內容，如果沒有做版本控制，專案可能將會面臨非常混亂的狀況，若無法確認每次修改的內容，可能會進一步的影響到整體功能與穩定性，尤其在多人共同開發的狀況下，更難以掌握每個檔案或程式碼的改動歷程，因此需要使用 git 做版本控制。
- git 的版本控制流程分為 `working dictionary (工作目錄)`、`staging area (暫存區)`、`local repository (本機儲存庫)` 及 `remote repository 
(遠端儲存庫)`。git 會監看工作目錄中的檔案變動，這時可以使用 `git add` 指令將有變動的檔案加入暫存區，再使用 `git commit` 將在暫存區的檔案提交到本機儲存庫中，最後使用 `git push` 
  推送到遠端儲存庫，達到版本控管的目的。

- 如何建立 git repository
    - 全新的專案
    - 已經有使用 git 版控的專案

- .gitignore 的意義
  - 有時專案中會有一些不需要進入版本控制的檔案，例如 IDE 設定檔、敏感內容檔案如環境設定檔等，就可以使用 .gitignore 檔案，使 git 忽略監看這些檔案的變動。
  - 某些框架在建立專案時會自動建立內含預設忽略檔案清單的 .gitignore 檔案，如果要自行建立，可以直接在專案資料夾根目錄新增一個 .gitignore 檔案，並在其中輸入要忽略的檔案或資料夾名稱並儲存即可。
  - 若是已經進入過版本控制、提交過的檔案，後續再將檔案名稱寫入至 .gitignore，不會有作用。
  
- 如何進行提交 (commit)
- 檔案還原
- 如何切換 branch
  - 為了方便版本的管理、不影響到原有功能，通常會建立許多不同分支來處理或管理不同的開發項目或版本。
  - 若還沒有其他分支，則需要先建立分支。
    - 可以直接使用 IDE 內建工具建立分支 (這邊使用 WebStorm)，首先點選視窗左上角代表目前所在分支的 `main` 選單，選擇 `New Branch`，輸入分支名稱並按確定。建立時若勾選底下的 
      `Checkout Branch` 選項，則可以在建立分支後直接切換到新建的分支；如果沒有勾選，則會留在原本的分支。
    - 也可以使用終端機建立分支，使用編輯器打開專案資料夾後，開啟終端機並確認執行位置在專案資料根目錄，輸入 `git branch 分支名稱`，即可建立新分支。
    - 分支建立完畢後，需要推送 (push) 到遠端儲存庫，如果沒有推送，該分支就只會在本機端。
  - 使用 IDE 內建工具直接切換分支：點選視窗左上角代表目前所在分支的 `main` ，展開選單後找到要切換至的分支，點選後選擇 `Checkout` 即可。
  - 使用終端機切換分支：首先可以輸入 `git branch` 指令查看目前所在分支，以及目前有哪些分支，再輸入 `git checkout 分支名稱` 即可切換到該分支。

- 何為衝突 (conflict)
  - 在多人共同開發或維護一個專案時，有時會遇到有多人同時在各自本機上改動了同一支檔案，造成檔案的內容不同，當要合併 (merge) 到同一個分支時，由於最終一個檔案內容只會有一種，因此就會出現衝突。
  - 出現衝突時，要視團隊習慣的合併方式，最終解決衝突、選擇正確的程式碼內容並合併。
    