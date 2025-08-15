'use client';

import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

type Topic = {
  id?:number;
  topic_name: string;
}

type Props = {
  topics: Topic[],
  selectedTopics: string[],
  onChange: (newSelectedTopic: string[]) => void,
}

export default function DropDownComponent({ topics, selectedTopics, onChange }: Props) {
  const toggleTopic = (topicName: string) => {
    if (selectedTopics.includes(topicName)) {
      onChange(selectedTopics.filter(t => t !== topicName));
    } else {
      onChange([...selectedTopics, topicName]);
    }
  };

  return (
    <>
      <div className="dropdown border-black border-b-2 mb-4 hover:cursor-pointer inline-block">
        <label tabIndex={0} className="flex items-center gap-2 py-1 px-2 hover:cursor-pointer">
          篩選主題 <MdOutlineKeyboardArrowDown />
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-4 shadow bg-base-100 rounded-box w-36 border-black border-2"
        >
          {topics?.map((topic, index) => (
            <li key={index}>
              <label className="label cursor-pointer justify-start gap-2">
                <input type="checkbox"
                       className="checkbox checkbox-primary"
                       checked={selectedTopics.includes(topic.topic_name)}
                       onChange={() => toggleTopic(topic.topic_name)}
                />
                <span className="label-text">{topic.topic_name}</span>
              </label>
            </li>
          ))}


        </ul>
      </div>
    </>
  );
}