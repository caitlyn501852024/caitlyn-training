import React, { useRef } from 'react';
import Quill from 'quill';
import QuillComponent, { QuillComponentProps } from './Quill';
import 'quill/dist/quill.snow.css';

interface EditorComponentProps {
  defaultHtml?: string;
  onTextChange?: QuillComponentProps['onTextChange'];
  onSelectionChange?: QuillComponentProps['onSelectionChange'];
}

export default function EditorComponent({
                                          defaultHtml,
                                          onTextChange,
                                          onSelectionChange
                                        }: EditorComponentProps) {
  const quillRef = useRef<Quill | null>(null);

  return (
    <>
      <div className="mb-2">
        <QuillComponent
          ref={quillRef}
          onTextChange={onTextChange}
          onSelectionChange={onSelectionChange}
          defaultHtml={defaultHtml}
        />
      </div>
    </>
  );
}
