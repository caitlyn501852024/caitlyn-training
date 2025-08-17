import React, { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import Quill, { DeltaStatic, RangeStatic, Sources } from 'quill';

export interface QuillComponentProps {
  defaultValue?: DeltaStatic;
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
  ({ defaultValue, onTextChange, onSelectionChange }, ref) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const defaultValueRef = useRef(defaultValue);
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
      editorContainer.className = 'min-h-[300px]';

      const toolbarOptions = {
        container: [
          [{ size: ['small', false, 'large', 'huge'] }],
          ['bold', 'italic', 'underline', 'strike', { align: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ color: [] }, { background: [] }],
          ['link', 'image'],
          ['clean'],
        ],
        handlers: {},
      };

      const quill = new Quill(editorContainer, {
        theme: 'snow',
        placeholder: '請輸入文章內容',
        modules: {
          toolbar: toolbarOptions,
        },
      });

      if (typeof ref === 'function') {
        ref(quill);
      } else if (ref) {
        ref.current = quill;
      }

      if (defaultValueRef.current) {
        quill.setContents(defaultValueRef.current);
      }

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

    return <div ref={containerRef}></div>;
  }
);

QuillComponent.displayName = 'QuillComponent';
export default QuillComponent;
