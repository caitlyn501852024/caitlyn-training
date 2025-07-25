#### 1. JavaScript 程式開發

- 環境設定
  - Node.js 和 npm 是什麼
    - Node.js 是基於 JavaScript 的執行環境，使 JavaScript 可以在除了網頁瀏覽器之外的環境執行。
    - npm (Node Package Manager) 是 Node.js 預設的套件管理工具。
  - 為什麼要使用 Node.js 和 npm
    - 原本 JavaScript 只能在網頁瀏覽器上執行，造成使用上有所限制。安裝 Node.js 後，在除了網頁瀏覽器之外的其他環境也可以直接執行 JavaScript，擴展了可用性。
    - 使用 npm 可以方便的管理專案有使用到的套件，也可以很方便的安裝相關的相依套件。

  - 如何在本地安裝 `Node.js` 與 `npm`
    - 至 Node.js 官網下載頁面 (https://nodejs.org/zh-tw/download)，選擇 LTS 版本 (截至撰寫時為 v22.17.1 版)，直接選擇下方 `下載 Windows 安裝程式` 並執行，跟隨安裝指引的步驟安裝即可。
    - 安裝完成後，開啟 Windows 的命令提示字元，輸入指令 `node -v`，若有安裝成功，會顯示安裝的 Node.js 版本號碼。
    - 安裝 Node.js 時就會同時安裝 npm。
    - 開啟 Windows 的命令提示字元，輸入指令 `npm -v`，即可查看安裝的 npm 版本號碼。

  - 使用 `npm` 初始化專案 (package.json)
    - 開啟命令提示字元，使用 cd 指令將執行位置移到專案資料夾根目錄，輸入指令 `npm init` (需手動輸入專案資訊) 或 `npm init -y` (直接套用預設設定)，可以建立 package.json 檔案。
    - package.json 檔案會在安裝套件時，寫入並記錄專案有使用的套件及套件版本資訊。這個檔案需一起進入 git 版本控制。
    - 安裝的套件會存在 node_modules 資料夾中，但這個資料夾內容通常不會進版控，因此當從雲端儲存庫 clone 專案至本機後，需先使用 npm 指令安裝專案所使用的套件，專案才能正常在本機執行。
    - 使用編輯器開啟專案後，開啟終端機，並確認執行位置在專案根目錄後，輸入指令 `npm i` (完整指令為 `npm install`)，會自動根據上述的 package.json 檔案，開始安裝必要套件。

  - 如何確認當前所在的專案環境 (使用 node -v 和 npm -v 確認版本)
    - 使用編輯器開啟專案資料夾後，開啟終端機並確認執行位置在專案資料夾根目錄，分別輸入 `node -v` 和 `npm -v` 即可查看安裝的 node.js 和 npm 版本。
    - 可以使用 nvm 管理 node 版本。

  - 全域安裝與專案安裝套件
    - 可以到 npm 網站 (https://www.npmjs.com/) 搜尋及安裝需要的套件。找到需要的套件後，可參考頁面上提供的安裝指令，使用終端機輸入指令進行安裝。
    - 例如專案要使用 Bootstrap 套件，使用編輯器開啟專案資料夾後，開啟終端機並確認執行位置在專案資料夾根目錄。接著在終端機輸入指令 `npm i bootstrap`，便會自動開始安裝。
    - 安裝套件時，有分成「全域安裝」與「專案安裝」，全域安裝的指令為 `npm i <套件名稱> -g`，會將套件安裝在電腦本機中，而不是專案底下的 node_modules 資料夾，同時不會出現在 package.json 檔案中。
    - 安裝套件時若直接輸入 `npm i <套件名稱>` 或使用 `npm i <套件名稱> --save` (產品上線使用)、
      `npm i <套件名稱> --save-dev` (開發使用) 指令則為專案安裝，會將套件安裝在專底下的 node_modules 資料夾，也會在 package.json 檔案中記錄套件名稱和版本資訊。

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
      - 要建立一個陣列，可以先宣告一個變數後，將資料內容以 `[]` 包覆賦值，每個元素間使用 `,` 分隔。也可以使用 `new Array()` 來建立一個新的陣列。
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
        // Array.pop()
        const arr9 = [3, 97, 20, 10];
        arr9.pop();
        console.log(arr9); // [3, 97, 20]
        ```
      - `shift()`：從陣列的最前端取出元素值，會改動到原本陣列。
        ```javascript
        // Array.shift()
        const arr10 = [41, 25, 63, 10, 5];
        arr10.shift();
        console.log(arr10); // [25, 63, 10, 5]
        ```
      - `unshift()`：從陣列的最前端加入元素值，會改動到原本陣列。
        ```javascript
        // Array.unshift()
        const arr11 = [23, 34, 12, 76];
        arr11.unshift(99);
        console.log(arr11); // [99, 23, 34, 12, 76]
        ```
      - `concat()`：串接陣列，並建立一個新的陣列，不會改動到原本陣列。
        ```javascript
        // Array.concat()
        const arr12 = arr10.concat(arr11);
        console.log(arr12); // [25, 63, 10, 5, 99, 23, 34, 12, 76]
        ```
      - `join([黏著符號])`：以可自訂的黏著符號串接成字串，不會改動到原本陣列。
        ```javascript
        // Array.join([黏著符號])
        const arr13 = ['it', 'is', 'hot', 'today'];
        const str = arr13.join('?');
        console.log(str); // 'it?is?hot?today'
        ```
      - `slice(索引 a, 索引 b)`：複製一個從索引 a 開始到索引 b 前的陣列（含 a 不含 b），不會改動到原本陣列。
        ```javascript
        // Array.slice(索引 a, 索引 b)
        const arr14 = [3, 8, 11, 65, 10, 45, 65];
        const arr15 = arr14.slice(2, 5);
        console.log(arr14); // [3, 8, 11, 65, 10, 45, 65]
        console.log(arr15); // [11, 65, 10]
        ```
      - `splice(索引位置, 數量, [加入元素])`：可以在指定的索引位置刪除和加入元素，會改動到原本陣列。
        ```javascript
        // Array.splice(索引位置, 數量, [加入元素])
        const arr16 = [1, 2, 3, 4, 5, 6, 7, 8];
        arr16.splice(3, 3, 99);
        console.log(arr16); // [1, 2, 3, 99, 7, 8]
        ```
      - `map()`：使陣列中的每個元素執行函式處理後，回傳一個新的陣列，需要回傳值，不會改動到原本陣列。若沒有回傳值，會回傳
        `undefined`。
        ```javascript
        // Array.map()
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
        // Array.filter()
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
        // Array.sort()
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
        - 從 ES6 開始，可以使用解構方式為陣列賦值，可以方便的將資料提取出來並賦值、簡化程式碼並提升可讀性。
        - 類似鏡像或映射的概念，一個變數對應一個資料，且陣列的解構賦值注重在資料順序 (索引)。如果變數數量多於資料數量，該變數值會是 undefined；如果變數數量少於資料數量，則只會賦值給有使用的變數，其他資料不受影響。
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
        - 物件是一組以「鍵、值對應 (key-value)」方式儲存的複合式資料，由 `{}` 包覆，物件的一組鍵值即為一個「屬性」，屬性名稱必須為字串或 Symbol，屬性值則可以是任何資料型態。若屬性值為動態 (例如函式等)，則該屬性稱為物件的「方法」。
        - 物件常用於資料的儲存及描述，類似關連式陣列，方便儲存及取用大量的資料，同時用於物件導向程式設計，可以設計出各種物件的屬性與方法便於管理與使用。
        - 要建立一個物件，可以先宣告一個變數後，將資料內容以 {} 包覆並給 `屬性名稱: 屬性值`，每組屬性間以 `,` 分隔。也可以使用 `new Object` 來建立一個新的物件。
            ```javascript
            // 一般的物件建立方式：使用 {} 包覆並給屬性名稱與屬性值
            const myCar = {
            // 物件的屬性
            color: 'red',
            brand: 'Toyota',
            price: 500000,
            isLoan: false,
            
            //物件的方法
            honk: function () {
                alert('honk!')
              }
            }
            
            // 使用 new Object 建立物件 (少用)
            const myObject = new Object();
            ```
      
      - 常見的物件方法：
        - `Object.keys()`：回傳一個物件中直屬於該物件的所有可列舉的「屬性鍵」的陣列。列舉出來的屬性鍵會是字串形式。
        - `Object.values()`：回傳一個物件中直屬於該物件的所有可列舉的「屬性值」的陣列。
        - `Object.entries()`：回傳一個物件中直屬於該物件的所有可列舉的「屬性鍵值對應」的陣列。
          ```javascript
          // Object.keys()、Object.values()、Object.entries()
          const obj1 = {
            name: 'aaa',
            height: 150,
            isDone: true
          }
          console.log(Object.keys(obj1)); // ['name', 'height', 'isDone']
          console.log(Object.values(obj1)); // ['aaa', 150, true]
          console.log(Object.entries(obj1)); // [['name', 'aaa'], ['height', 150], ['isDone', true]]
          ```
          
        - `Object.assign(target, sources)`：複製一個或多個物件的屬性到另一個目標物件，若來源物件有重複的屬性，後面的來源內容會覆蓋掉前面的來源內容以及目標內容。此方法為複製參照位址的淺拷貝。
          ```javascript
          // Object.assign()
          const targetObj1 = {a: 1, b: 2};
          const sourceObj1 = {b: 3, c: 4};
          const sourceObj2 = {a: 99, d: 5};
          const newObj = Object.assign(targetObj1, sourceObj1, sourceObj2);
        
          console.log(newObj); // {a: 99, b: 3, c: 4, d: 5}
          ```
        - `Object.create()`：用於創建新的物件，並指定該物件的原型。透過此方法可以繼承其他物件的原型。
          ```javascript
          // Object.create()
          const member = {
            memberAccount: '會員帳號',
            memberName: '會員名稱',
            memberAge: 18,
            isVip: false,
          }
          const newMember1 = Object.create(member);
          console.log(newMember1.memberAccount); // '會員帳號'
            
          // 設定新的屬性值給 newMember1
          newMember1.memberAccount = 'apple1234';
          newMember1.memberName = '小蘋果';
          console.log(newMember1.memberAccount); // 'apple1234'
          console.log(newMember1.memberName); // '小蘋果'
          ```
      - Object Destructuring
        - 從 ES6 開始，可以使用解構方式為物件賦值，可以方便的將資料提取出來並賦值、簡化程式碼並提升可讀性。
        - 類似鏡像或映射的概念，一個變數對應一個資料，且物件的解構賦值注重在屬性名稱，與陣列以對照索引不同，物件的解構需要使用相同的屬性名稱，如果沒有對應的屬性名稱，則會是 undefined。
        ```javascript
        // 物件的解構賦值
        // 一般的解構賦值
        const obj2 = {
          height: 150,
          weight: 100,
        }
        let {height, weight} = obj2;
        console.log(height, weight); // 150, 100
        ```
        - 雖然是以屬性名稱作為解構賦值的對應，但實際上是賦值給 `:` 後面的屬性值。上面的程式碼中的
          ```javascript
          let {height, weight} = obj2;
          ```
          完整的寫法是：
          ```javascript
          let {height: height, weight: weight} = obj2;
          ```
          ```javascript
          // 賦值是賦給 : 後面的變數
          const obj3 = {
            name1: 100,
            name2: 200,
          }
          let {name1: n1, name2: n2} = obj3;
          console.log(name1); // ReferenceError: name1 is not defined
          console.log(n1); // 100
          console.log(name2); // ReferenceError: name2 is not defined
          console.log(n2); // 200
          ```
        ```javascript
        // 延伸：其餘運算子
        const {a, ...others} = {a: 1, b: 2, c: 3};
        console.log(a); // 1
        console.log(others); // {b: 2, c: 3}
        ```
      - Set (集合)
        - 什麼是 Set (定義、特性、用途等)，如何建立一個 Set
          - Set 是用來儲存唯一值的資料集合，一個 Set 中的一個元素都會是不重複的唯一值，適合用來判斷某元素是否存在或是去除重複元素。
          - Set 中的元素沒有順序性，且可迭代，可使用遍歷方法。
          - 如果希望陣列中的元素不重複，可以使用 Set。
          - 使用 `new Set()` 來建立一個新的 Set。
            ```javascript
            // 建立一個新的空 Set
            const set1 = new Set();
            
            // 建立 Set 時直接賦給內容
            const set2 = new Set([1, 2, 3]);
            ```
        - 常見的 Set 方法：
          - `add()`：在 Set 尾端加入一個新元素。
            ```javascript
            // add()
            const set3 = new Set();
            set2.add('apple');
            console.log(set3); // Set(1) {'apple'}
            set2.add(66);
            console.log(set3); // Set(2) {'apple', 66}
            ```
          - `delete()`：從 Set 中刪除指定的元素。若刪除成功，回傳值為 true；刪除失敗回傳值為 false。
            ```javascript
            // delete()
            const set4 = new Set();
            set3.add('apple').add('banana').add('strawberry');
            console.log(set4); // Set(3) {'apple', 'banana', 'strawberry'}
            set3.delete('banana');
            console.log(set4); // Set(2) {'apple', 'strawberry'}
            
            // 刪除不存在的元素時，不會有錯誤也不會影響其他元素，但會有回傳值為 false
            set3.delete('sky');
            console.log(set4); // Set(2) {'apple', 'strawberry'}
            ```
          - `has()`：判斷 Set 中是否包含某元素。
            ```javascript
            // has()
            const set5 = new Set([1, 2, 5]);
            console.log(set5.has(3)); // false
            ```
          - `clear()`：清除 Set 中的所有元素。
            ```javascript
            // clear()
            const set6 = new Set([1, 2, 3]);
            console.log(set6); // Set(3) {1, 2, 3}
            set5.clear();
            console.log(set6); // Set(0) {}
            ```
          - `intersection()`：回傳一個同時包含在多個不同 Set 中的元素的新 Set，類似交集的概念。
            ```javascript
            // intersection()
            const set7 = new Set([2, 4, 6, 8, 10, 12]);
            const set8 = new Set([3, 6, 9, 12, 15]);
            console.log(set7.intersection(set8)); // Set(2) {6, 12}
            ```
          - `union()`：回傳一個包含多個不同 Set 中所有元素的新 Set，類似聯集的概念。
            ```javascript
            // union()
            const set9 = new Set([1, 2, 3]);
            const set10 = new Set([6, 4, 2]);
            console.log(set9.union(set10)); // Set(5) {1, 2, 3, 6, 4}
            ```
      - Map
        - 說明什麼是 Map (定義、特性、用途等)，如何建立一個 Map
          - Map 是用於儲存「鍵值對應 (key-value pairs)」的資料的物件，與 Object 不同的是，Map 中的鍵是不重複的唯一值，且 Map 的鍵可以使用任何資料型態，Map 中的鍵值對會按照加入的順序排列。
          - 如果希望物件中的鍵不重複，可以使用 Map。
          - 使用 `new Map()` 來建立一個新的 Map。
            ```javascript
            // 建立一個空的 Map 物件
            const map1 = new Map();
            
            // 建立 Map 時賦給內容
            const map2 = new Map([
              ['a', 1],
              ['b', 2],
            ]);
            ```
        - 常見的 Map 方法：
          - `set()`：在 Map 中加入一個新屬性。
            ```javascript
            const map3 = new Map();
            map3.set(1, 'red');
            console.log(map3); // Map(1) {1 => 'red'}
            ```
          - `get()`：取得指定的 key 的屬性值。若 Map 中沒有該屬性，會是 undefined。
            ```javascript
            // get()
            const map4 = new Map([
              ['apple', 'red'],
              ['banana', 'yellow'],
              ['grape', 'purple']
            ]);
            console.log(map4.get('banana')); // 'yellow'
            console.log(map4.get('orange')); // undefined
            ```
          - `delete()`：從 Map 中刪除指定的屬性。若刪除成功，回傳值為 true；刪除失敗回傳值為 false。
            ```javascript
            // delete()
            const map5 = new Map([
              ['John', 30],
              ['Mary', 25],
              ['David', 35]
            ])
            console.log(map5); // Map(3) {'John' => 30, 'Mary' => 25, 'David' => 35}
            
            map5.delete('Mary');
            console.log(map5); // Map(2) {'John' => 30, 'David' => 35}
            
            // 刪除不存在的屬性時，不會有錯誤也不會影響其他屬性，但會有回傳值為 false
            map5.delete('Ken');
            console.log(map5); // Map(2) {'John' => 30, 'David' => 35}
            ```
          - `has()`：判斷 Map 中是否包含某屬性。
            ```javascript
            // has()
            const map6 = new Map([
              [1, 'one'],
              [2, 'two'],
              [3, 'three']
            ])
            console.log(map6.has(2)); // true
            console.log(map6.has(4)); // false
            ```
          - `clear()`：清除 Map 中的所有內容。
            ```javascript
            // clear()
            const map7 = new Map([
              ['a', 23],
              ['b', 45],
              ['c', 67]
            ])
            console.log(map7); // Map(3) {'a' => 23, 'b' => 45, 'c' => 67}
            map7.clear();
            console.log(map7); // Map(0) {}
            ```
          - `keys()`：回傳一個該 Map 中所有可列舉的「屬性鍵」的新 Map 迭代器物件。回傳結果會依屬性對應加入時的順序排列。
          - `values()`：回傳一個該 Map 中所有可列舉的「屬性值」的新 Map 迭代器物件。回傳結果會依屬性對應加入時的順序排列。
          - `entries()`：回傳一個該 Map 中所有可列舉的「屬性鍵值對應」的新 Map 迭代器物件。回傳結果會依屬性對應加入時的順序排列。
            ```javascript
            // keys()
            const map8 = new Map([
              ['name', 'Alice'],
              ['age', 30],
              ['city', 'New York']
            ])
            console.log(map8.keys()); // MapIterator {'name', 'age', 'city'}
            
            // 此 Map 迭代器物件可使用 for-of 等遍歷方法
            const keysIterator = map8.keys();
            for (let key of keysIterator) {
              console.log(key); // 'name', 'age', 'city'
            }
            
            // values()
            console.log(map8.values()); // MapIterator {'Alice', 30, 'New York'}
            
            // 一樣可使用 for-of 等遍歷方法
            const valuesIterator = map8.values();
            for (let value of valuesIterator) {
              console.log(value); // 'Alice', 30, 'New York'
            }
            
            // entries()
            console.log(map8.entries()); // [Map Entries] {['name', 'Alice' ], [ 'age', 30 ], [ 'city', 'New York' ]}
            
            // 一樣可使用 for-of 等遍歷方法
            for (let entry of map8.entries()) {
              console.log(entry); // ['name', 'Alice' ], [ 'age', 30 ], [ 'city', 'New York' ]
            }
            ```
- Function (函式 or 函數 or 方法)
  - 函數是將一段或多段程式碼包裝起來，便於重複使用與維護。
  - 一個函數包含函數名稱 (可無，沒有名稱的函式稱為匿名函式)、以 `()` 包裹的參數與以 `{}` 包裹的程式碼內容區塊。
  - 普通函數與箭頭函數
    - `函數宣告 (Function Declaration)`：最基礎的函數宣告方式，使用 `function` 後面接函數名稱與使用 `()` 包裹的參數，及使用 `{}` 包裹的程式碼內容區塊。
      ```javascript
      // 宣告函式
      function f1(a, b) {
        alert('This is a function declaration');
      }
      ```
    - `表達式 (Function Expression)`：先宣告一個變數，再將函數賦給這個變數，這種宣告方式為函數表達式。
      ```javascript
      // 函式表達式
      const f2 = function(a, b) {
        alert('This is a function expression');
      }
      ```
    - 箭頭函數 (Arrow Function)
      - 從 ES6 開始新增的函式宣告方式，使用 `=>` 來取代 `function` 關鍵字，語法上更簡潔易讀。
      - 雖然箭頭函式比傳統函式更簡潔，但有些特性與傳統函式不同，因此不能將箭頭函式視為傳統函式的語法糖，兩者主要的差異有：
        - 箭頭函式僅有函式表達式宣告方式。
        - 箭頭函式沒有自己的 `this`，也無法直接修改 `this` 的指向。
        - 箭頭函式沒有自己的 `arguments` 物件。
        - 箭頭函式不能作為建構函式使用。
      - 箭頭函數的宣告
        - 箭頭函式僅有函式表達式宣告方式，使用 `=>` 取代 `function` 關鍵字。
          ```javascript
          // 箭頭函式的宣告
          const f3 = (a, b) => {
            alert('This is an arrow function');
          }
          
          // 如果只有一個參數，則可以省略參數的 ()，也可以不省略
          const f4 = c => {
            console.log(c);
          }
          
          // 如果沒有參數，則一定要加上 ()，不可省略
          const f5 = () => {
            // do something
          }
          
          // 如果程式碼區塊只有簡單一行表達式，可以省略 {} 及 return
          const f6 = d => d * d;
          ```
        
      - 箭頭函數與 `this` 的關係
        - 箭頭函式沒有自己的 `this`，也無法直接修改 `this` 的指向。箭頭函式的 `this` 在定義時就已經決定，會是根據最接近自己的外層 function scope 來決定 `this` 值。
          ```javascript
          // 一般函式與箭頭函式的 this 指向
          const obj1 = {
            value: 42,
            normalFn: function () {
            console.log(this.value);
          },
          arrowFn: () => {
            console.log(this.value);
          }
          };
          
          // 呼叫兩種函式查看 this 的結果
          obj1.normalFn(); // 42 (指向 obj1)
          obj1.arrowFn(); // undefined (在瀏覽器執行時會往外層指向 window 物件，而 window 物件沒有 value 這個屬性)
          ```
        - 箭頭函式中無法綁定 `this` 值。
          ```javascript
          // 箭頭函式綁定 this 無效
          const obj2 = {value: 100};
          const f7 = () => {
            console.log(this.value);
          };
          const bindFn = f7.bind(obj2);
          
          bindFn(); // undefined，綁定無效
          ```

  - 函數參數與回傳值
    - 參數：ES6 開始加入了預設參數與剩餘參數等語法，在建立函式時能更方便的加入參數值並提升程式碼的可讀性。
      - 預設參數：原本函式如果沒有傳入參數，參數的預設值都是 undefined，某些情況下可能會導致錯誤或輸出不符合預期，預設參數可以在沒有傳入參數的狀況下，將參數以指定的預設值初始化。
        - 若有多個參數但只設定一個預設參數，建議從後面的參數開始設定。
        ```javascript
        const f8 = (a, b = 10) => {
          console.log(a + b);
        }
        f8(5); // 5 + 10 = 15
        f8(3, 6); // 3 + 6 = 9
        ```
      - 剩餘參數 (Rest parameters)：能夠定義一個「可以接收不定量參數」的函式，用於不知道呼叫函式時會傳進多少參數的時候，剩餘參數會取得剩下的參數後存放在同一個陣列中。
        - 使用 `...` 加上陣列變數名稱。
        - 剩餘參數必須放在最後一個參數位置，且只能有一個剩餘參數。
        ```javascript
        // 剩餘參數
        const f9 = (...rest) => {
          console.log(rest);
        }
        f9(); // []
        f9(66, 77, 88, 99); // [66, 77, 88, 99]
        
        // 剩餘參數必須放在最後一個參數位置
        const f10 = (a, ...b, c) => {}
        f10(); // SyntaxError: Rest parameter must be last formal parameter
        ```
      - 解構參數
        - 解構賦值運用在函式參數中，可以方便的提取傳入的物件或陣列的資料。
          ```javascript
          const f11 = ({ name, age }) => {
            console.log(name, age);
          };
          
          const member = {
            name: "Alex",
            age: 33,
          };
          
          f11(member); // Alex 33
          ```
    - 回傳值
      - return
        - 使用 `return` 可以將函式的執行結果回傳，並可以宣告變數來儲存這個結果，以便作後續的利用，並可以使程式碼更簡潔。如果沒有設定回傳值，回傳值預設為 undefined。當函式執行到 `return` 時，同時也會結束函式的執行，後面的程式碼不會被執行，常用在當滿足條件時即提前終止程式。
          ```javascript
          // 使用 return 回傳值並讓其他函式使用
          const f12 = (a, b) => {
            return a + b;
          }
          
          const f13 = ()=>{
            const result = f12(6,8);
            console.log(result);
          }
          f13(); // 14
          ```
      - yield：ES6 以後新增，用於生成器 (generator) 函式。
        - 宣告函式並在前面加上 `*` 即可建立一個 generator，並可在需要暫停執行的地方使用 `yield`，即可做函式的流程控制。
        - 每次程式執行到 `yield` 時，會暫停程式的執行，並回傳一個迭代器結果物件，可使用 `next()` 來呼叫函式繼續執行，會從上一次暫停的地方繼續執行，直到遇到下一個 `yield` 或 `return` 為止。
        ```javascript
        // 生成器函式使用 yield 暫停與繼續執行
        function* f14() {
          let count = 0;
          while (true) {
            yield count;
            count++;
          }
        }
        const result = f14();
        console.log(result.next()); // {value: 0, done: false}
        console.log(result.next()); // {value: 1, done: false}
        console.log(result.next()); // {value: 2, done: false}
        ```
    
  - Scope 與 Closure
    - Scope (作用域 / 範疇)：Scope 是指變數或資料在程式碼執行時可以被看見或被取用的範圍，JavaScript 中的 Scope 分成三種層級：
      - 全域 (Global Scope)：當 JavaScript 開始執行時，就會建立一個全域的執行環境，只要不是定義在函式或塊級作用域中的變數，就會成為全域變數，在程式碼中的任何位置都可以取得並使用。
        ```javascript
        // 全域變數
        const global = 'global';
        function print1() {
          console.log(global);
        }
        print1(); // 'global'
        
        // 如果沒有宣告就直接賦值也會變成全域變數
        function f15(){
          a = 'apple'; // 沒有使用宣告，a 會變成全域變數
        }
        f8();
        console.log(a); // 'apple'
        ```
      
      - 函式作用域 (Function Scope)：由函式建立的作用域，只能在該函式中使用。
        ```javascript
        // 函式作用域
        function f16() {
          const b = 'banana';
          console.log(b);
        }
        f16(); // 'banana'
        console.log(b); // ReferenceError: b is not defined
        ```
      - 區塊作用域 (Block Scope)：ES6 以後出現，在一組 `{}` 範圍內的區域，例如 if 判斷式、for 迴圈等。
        ```javascript
        // 區塊作用域
        function f17() {
          if (true) {
            const c = 'cherry';
            const d = 'dog';
            console.log(c); // 'cherry'
          }
          console.log(c); // ReferenceError: c is not defined
          console.log(d); // ReferenceError: d is not defined
        }
        f17();
        console.log(c); // ReferenceError: c is not defined
        console.log(d); // ReferenceError: d is not defined
        ```
      - 使用 `let` 和 `const` 宣告的變數為塊級作用域，使用 `var` 宣告的變數則為函式作用域。
    - Closure (閉包)：Closure 是指一個函式及該函式被宣告時所在的作用域環境組合，巢狀函式 (一個函式中 return 另一個函式) 是最常見的 Closure，但其實不只巢狀函式是 Closure，所有函式在建立時都會產生 Closure。
    - 如果不使用 Closure，全部變數都在全域宣告及使用，非常容易互相污染導致程式執行錯誤或與預期不同。
    - Closure 中的內部函式能夠取得並記憶外部的變數，常用來做狀態的保存。
      ```javascript
      // 巢狀函式的 closure
      function outer() {
        let a = 0;
        function inner() {
          a++;
          console.log(a);
        }
        return inner;
        }
      const increment = outer();
      
      // 因為內部函式可以拿到外部函式的變數並記住，因此每次呼叫時 a 都會 +1
      increment(); // 1
      increment(); // 2
      increment(); // 3
      ```

- 常見工具與方法
    - typeof 和 instanceof 運算符
      - 在開發過程中，有時會需要檢查變數或資料的型別，以確保執行的結果符合預期或避免問題、確保程式的穩定性。
      - `typeof` 用於判斷資料或變數的型別並以字串回傳。
        ```javascript
        // typeof
        typeof 123; // 'number'
        typeof 'hello'; // 'string'
        typeof true; // 'boolean'
        typeof NaN; // 'number'
        typeof undefined; // 'undefined'
        typeof [1, 2, 3]; // 'object'
        typeof {a:1, b:2}; // 'object'
        ```
        - 在 JavaScript 中，除了基本類型 (String、Number、Boolean、Undefined、Null、BigInt 和 Symbol) 之外，其餘皆可視為物件類型，因此陣列也會回傳 'object'，可使用 `isArray()` 來檢查是否為陣列。
          ```javascript
          // 使用 Array.isArray() 檢查是否為陣列
          const a = [1, 2, 3];
          const b = {a: 1, b: 2};
          console.log(Array.isArray(a)); // true
          console.log(Array.isArray(b)); // false
          ```
        - 另外比較特殊的是 `null`，由於 JavaScript 從一開始設計上的原因，導致 `typeof null` 會回傳 `'object'`，且目前預計暫時不會再修正這個問題。
          ```javascript
          // null
          typeof null; // 'object'
          ```
      - `instanceof` 用來判斷 A 是否為 B 的實例，比較的是原型 (prototype)，並回傳布林值。
        ```javascript
        // instanceof
        function C() {}
        function D() {}
        
        const e = new C();
        console.log(e instanceof C); // true
        console.log(e instanceof D); // false
        ```
      - 也可使用 `obj.constructor.name` 取得該物件的最終類型名稱。
        ```javascript
        const c = [3, 7, 11];
        const d = {x: 1, y: 2};
        console.log(c.constructor.name); // 'Array'
        console.log(d.constructor.name); // 'Object'
        ```

#### 3. JavaScript 進階練習

- Package 與 Module
  - 什麼是 Package 與 Module
    - 開發過程中，當專案規模越來越大、程式碼與功能越來越多時，若將全部的功能與程式碼都寫在主程式中，程式碼將變得非常繁雜、龐大，造成難以閱讀與維護，模組 (Module) 
    便是將各種不同用途或功能的程式碼分別獨立出來，並可引入到主程式中使用的檔案，以維持主程式的整潔與增加易讀性，方便維護與使用。
    - Package 則是包含一個或多個 Module 與相關的資源檔案組合成的資料夾，並以 package.json 檔案作描述。
  - 如何使用 import 與 export 來引入與匯出模組
    - import 與 export 為 ES Modules 的語法，而 Node 預設為使用 CommonJS`，若要使用 `ES Modules`，需先在專案的 `package.json 檔案中加入 type: 'module' 的設定。
    - 將所需的功能獨立出來檔案模組化開發，並以 export 匯出模組。
      ```javascript
      // calculator.js
      const add = (a, b) => {
        return a + b;
      };
      
      const subtract = (a, b) => {
        return a - b;
      };
      
      const multiply = (a, b) => {
        return a * b;
      };
      
      // 使用 export 將所有函式分別匯出成模組
      export {add, subtract, multiply};
      ```
    - 接著在主程式中使用 import 引入模組。
      ```javascript
      // index.js
      // 用 {} 將每一個函式引入
      import { add, subtract, multiply } from './calculator.js';
      
      // 即可在主程式使用
      console.log(add(1, 2)); // 3
      console.log(subtract(7, 3)); // 4
      console.log(multiply(5, 4)); // 20
      ```
- Promise 與 Async/Await
  - 說明什麼是Promise，以及如何使用它
  - 說明如何使用 `async` 與 `await` 進行非同步操作的處理
  - 異常處理 (try...catch) 與實踐原則
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
  - 在開發過程中，常常需要將資料等印出來方便確認及查看，或是需要記錄程式錯誤內容並方便維護與修正，因此需要妥善的運用 log 日誌。
  - 使用方式為在程式碼中需要的地方使用 `console.log()` 等方法，即可在執行環境的 console 中確認內容。
  - log 類型的介紹
    - `console.log`：最基本的日誌，輸出一般的文字訊息和資料。
      ```javascript
      console.log('hi'); // 'hi'
      console.log(5); // 5
      ```
    - console.warn：會以淺黃色驚嘆號與淺黃底做標記，用於輸出一些嚴重程度可能還不到影響整體程式執行的警告訊息，或是標記一些比一般 log 更重要的內容。
      ```javascript
      console.warn('watch out'); // 'watch out'
      ```
    - console.error：會以紅色叉叉與紅底做標記，用於輸出一些嚴重程度可能會影響整體程式執行的錯誤訊息，常用於錯誤處理。
      ```javascript
      console.error('Something is going wrong'); // 'Something is going wrong'
      ```
    - console.info：會以藍色 i 資訊圖示與藍底做標記，用於輸出一些資訊性內容，常用於補充額外資訊。
      ```javascript
      console.info('one more thing...'); // 'one more thing...'
      ```
  - 使用套件 `winston` 進行日誌記錄
    - `winston` 是一個日誌記錄套件，可以在程式執行出錯的時候將錯誤等內容記錄下來，
      方便後續的維護與修正。winston 包含輸出器與 `error`、`warn`、`info`、`http`、`verbose`、`debug` 與 `silly` 等 7 種不同的輸出等級，皆可按需求自由設定，便於使用與查看。
    - 設定方式：
      1. 安裝 winston 套件：在終端機中輸入 `npm i winston`。
      2. 在程式碼中引入套件並設定輸出器與等級。
      3. 即可使用其提供的各種 log 方法來記錄日誌。
      ```javascript
      // 安裝完後，引入套件並設定
      import winston from "winston";
      
      const logger = winston.createLogger({
        level: 'info', // 未指定等級時，預設使用 info 等級
        format: winston.format.json(), // 輸出格式
        defaultMeta: {service: 'user-service'},
        transports: [
          // error 或以上等級的錯誤，寫入 error.log 檔案中
          new winston.transports.File({filename: 'error.log', level: 'error'}),
          // info 或以上等級的訊息，寫入 combined.log 檔案中
          new winston.transports.File({filename: 'combined.log'}),
        ],
      });
      
      // 不在產品 (production) 環境時，也將 log 訊息輸出到 console 中
      if (process.env.NODE_ENV !== 'production') {
        logger.add(new winston.transports.Console({
          format: winston.format.simple(),
        }));
      }
      
      // 底下即可自由設定呼叫使用各種 log
      logger.log('info', 'hello winston');
      logger.error('there is an error');
      
      logger.log({
        level: 'info',
        message: 'info123',
      })
      ```
    - 日誌內容會被記錄在 `error.log` 及 `combined.log` 檔案中。
  

- 命名慣例
  - 為了專案統一風格、方便維護管理及提升程式碼的可讀性，不同的資料型態會有各自慣用的命名規則。
  - JavaScript 通用的命名規則
    - 不可使用 JavaScript 的保留字。
    - 名稱開頭需使用字母、下底線 (_) 或錢字號 ($)，不可使用數字作為開頭。以下底線或錢字號開頭通常為特殊變數使用。
    - 名稱開頭以外，可使用字母、下底線、錢字號和數字。
    - 大小寫有差異。
    - 盡量使用語意化、容易辨識的名稱，避免太過簡略或模糊的縮寫。
  - Package
    - 全小寫命名，通常使用公司或組織名稱作為前綴，單詞間以 `.` 連接。
    - 名稱通常包含以下項目：
      - 公司或組織名稱
      - 系統名稱
      - 模組名稱
      - 功能名稱
      - 功能分類項目
    - 例：`com.company.core.common`。
  - Module
    - 根據 module 的類型（變數 / 函式......等）使用對應的命名方式。
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
  - 在開發或維護專案時，由於會非常頻繁的新增或刪改程式碼或資料內容，如果沒有做版本控制，專案可能將會面臨非常混亂的狀況，若無法確認每次修改的內容，可能會進一步的影響到整體功能與穩定性，尤其在多人共同開發的狀況下，更難以掌握每個檔案或程式碼的改動歷程，因此需要使用 git 做版本控制。
  - git 的版本控制流程分為 `working dictionary (工作區)`、`staging area (暫存區)`、`local repository (本機儲存庫)` 及 `remote repository 
  (遠端儲存庫)`。git 會監看工作區中的檔案變動，這時可以使用 `git add` 指令將有變動的檔案加入暫存區，再使用 `git commit` 將在暫存區的檔案提交到本機儲存庫中，最後使用 `git push` 推送到遠端儲存庫，達到版本控管的目的。
  - 可以至 git 網站 (https://git-scm.com/downloads) 直接下載所需的版本並按安裝指引安裝。

- 如何建立 git repository
  - 全新的專案
    - 創建新專案後，使用 IDE 開啟專案資料夾，開啟終端機並確認執行位置在專案資料夾根目錄，輸入初始化指令 `git init`，會自動在專案資料夾建立一個隱藏的資料夾 `.git`，此時專案便開始受到 git 監看變動，可以開始進行版本控制。
    - 接著輸入指令 `git remote add origin [遠端儲存庫網址]` 即可連接遠端儲存庫，再輸入指令 `git push -u origin main`，即可將本機端的 `main` 分支推送到遠端。

  - 已經有使用 git 版控的專案
    - 如果是從遠端儲存庫 clone 專案至本機，在複製專案時即會自動進入版控。

- .gitignore 的意義
  - 有時專案中會有一些不需要進入版本控制的檔案，例如 IDE 設定檔、敏感內容檔案如環境設定檔等，就可以使用 .gitignore 檔案，使 git 忽略監看這些檔案的變動，而不進入版本控制中。
  - 使用某些框架建立專案時，會自動建立內含預設忽略檔案清單的 .gitignore 檔案，如果要自行建立，可以直接在專案資料夾根目錄新增一個 .gitignore 檔案，並在其中輸入要忽略的檔案或資料夾名稱並儲存即可。
  - 若是已經進入過版本控制、提交過的檔案，後續再將檔案名稱寫入至 .gitignore，不會有作用。
  
- 如何進行提交 (commit)
  - 開發時可以將進度或功能切分成段落，每完成一個段落時，可以先將改動提交上去，避免影響或污染到其他功能或版本，以達到版本控管的目的。
  - git 會監看專案的檔案改動，可以在終端機先使用 `git status` 指令確認有變動的檔案狀況，並使用 `git add 檔案名稱` 將想要提交的檔案加入到暫存區，也可以使用 `git add .` 
    一次將全部有變動的檔案都加入暫存區。接著輸入 `git commit -m "提交訊息"`，即可將檔案提交。最後再輸入 `git push` 即可推送到遠端儲存庫。
  - 提交訊息一定要寫，內容與寫法則視團隊習慣，但基本上必須清楚說明本次提交中包含的內容及類別等，以利版本控制與團隊維護。

- 檔案還原
  - 有時會遇到 commit 上去的版本可能有一些問題，為了版本的穩定，因此需要退版本，將檔案還原。
  - 首先在終端機輸入指令 `git log` 確認近幾次提交的版本資訊並記下需要回復至的版本編號。
  - 使用 `git reset` 指令
    - 輸入 `git reset --soft 版本號碼` 指令，會將檔案還原到該版本的狀態，並會保留原始 commit 版本資訊及檔案狀態，比較像是移動 HEAD 的概念。
    - 輸入 `git reset --hard 版本號碼` 指令，會直接將檔案還原到該版本的狀態，並且不會保留所有原始 commit 版本的任何資訊及檔案狀態，因此需謹慎使用。
  - 使用 `git checkout` 指令
    - 輸入 `git checkout 版本號碼`，可以將 HEAD 移至該版本，並將檔案回復成該版本的狀態，此時可以創建一個新的分支並繼續後續的開發或修正，再合併回 main 即可。
  - 使用 `git revert` 指令
    - 輸入 `git revert 版本號碼` 指令，可以復原該版本的提交並會自動創建一個新的提交版本，原始的 commit 記錄也仍然會保留。

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
    