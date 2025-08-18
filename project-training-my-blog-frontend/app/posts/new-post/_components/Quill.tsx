import React, { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import Quill, { DeltaStatic, RangeStatic, Sources } from 'quill';

export interface QuillComponentProps {
  defaultValue?: DeltaStatic;
  defaultHtml?: string;
  onTextChange?: (
    content: DeltaStatic,
    delta: DeltaStatic,
    source: Sources,
    editor: Quill
  ) => void;
  onSelectionChange?: (
    range: RangeStatic | null,
    oldRange: RangeStatic | null,
    source: Sources
  ) => void;
}

const QuillComponent = forwardRef<Quill, QuillComponentProps>(
  ({ defaultValue, defaultHtml, onTextChange, onSelectionChange }, ref) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const quillRef = useRef<Quill | null>(null);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
    });

    useEffect(() => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const editorContainer = container.appendChild(
        container.ownerDocument.createElement('div')
      );

      const toolbarOptions = {
        container: [
          [{ size: ['small', false, 'large', 'huge'] }],
          ['bold', 'italic', 'underline', 'strike', { align: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ color: [] }, { background: [] }],
          ['link', 'image'],
          ['clean']
        ],
        handlers: {
          image: async function() {
            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');
            input.click();

            input.onchange = async () => {
              if (!input.files || input.files.length === 0) return;
              const file = input.files[0];

              const formData = new FormData();
              formData.append('file', file);

              try {
                const res = await fetch(
                  'http://localhost:3001/api/upload-article-img',
                  {
                    method: 'POST',
                    body: formData
                  }
                );
                const data = await res.json();
                if (data.status === 'success') {
                  const range = quill.getSelection();
                  const index = range?.index ?? quill.getLength();
                  quill.insertEmbed(index, 'image', data.filePath);
                  quill.setSelection(index + 1);
                }
              } catch (err) {
                console.error('上傳失敗', err);
              }
            };
          }
        }
      };

      const quill = new Quill(editorContainer, {
        theme: 'snow',
        placeholder: '請輸入文章內容',
        modules: {
          toolbar: toolbarOptions
        }
      });

      quillRef.current = quill;

      // 對外轉接 ref
      if (typeof ref === 'function') ref(quill);
      else if (ref) ref.current = quill;

      quill.on(Quill.events.TEXT_CHANGE, (delta, oldDelta, source) => {
        onTextChangeRef.current?.(quill.getContents(), delta, source, quill);
      });

      quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
        onSelectionChangeRef.current?.(...args);
      });

      return () => {
        if (typeof ref !== 'function' && ref) {
          ref.current = null;
        }
        container.innerHTML = '';
      };
    }, [ref]);

    // 資料到齊時餵 HTML
    useEffect(() => {
      if (!quillRef.current || defaultHtml === undefined) return;

      const q = quillRef.current;

      // 避免覆蓋使用者已經輸入的內容：只有在目前是空白時才塞
      const isEmpty = q.root.innerHTML.trim() === '<p><br></p>' || q.root.innerHTML.trim() === '';

      // 只有當編輯器為空時，才載入預設 HTML
      if (isEmpty) {
        // 直接設定 innerHTML
        q.root.innerHTML = defaultHtml;
      }
    }, [defaultHtml]);

    // 支援 Delta 預設值
    useEffect(() => {
      if (!quillRef.current || !defaultValue) return;
      const q = quillRef.current;
      const isEmpty = q.getLength() <= 1;
      if (isEmpty) q.setContents(defaultValue, 'silent');
    }, [defaultValue]);

    return <div ref={containerRef} className="min-h-[300px]"></div>;
  }
);

QuillComponent.displayName = 'QuillComponent';
export default QuillComponent;
