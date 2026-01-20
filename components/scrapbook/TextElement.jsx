'use client';
import React, { useState } from 'react';

export default function TextElement({ content, onUpdate, isCover, readOnly }) {
  const [data, setData] = useState(content || { heading: '', body: '' });

  const handleChange = (field, value) => {
    const newData = { ...data, [field]: value };
    setData(newData);
    onUpdate(newData);
  };

  return (
    <div className={`w-full h-full flex flex-col justify-center items-center text-center ${isCover ? 'p-12 bg-black text-white' : 'p-8'}`}>
        <input 
            type="text" 
            readOnly={readOnly}
            placeholder={!readOnly ? (isCover ? "TITLE HERE" : "HEADLINE GOES HERE") : ""}
            value={data.heading}
            onChange={(e) => handleChange('heading', e.target.value)}
            className={`w-full text-center bg-transparent font-black uppercase border-b-2 border-transparent mb-4 placeholder-gray-500
                ${isCover ? 'text-3xl md:text-4xl text-white placeholder-gray-600' : 'text-3xl placeholder-gray-300'}
                ${!readOnly ? 'hover:border-white focus:outline-none focus:border-[#A3E635]' : 'outline-none cursor-default'}
            `}
        />
        
        {readOnly ? (
             <div className={`w-full whitespace-pre-wrap font-medium leading-relaxed p-4
                ${isCover ? 'text-lg text-gray-300' : 'text-lg text-gray-700'}
             `}>
                {data.body}
             </div>
        ) : (
            <textarea
                placeholder={isCover ? "Description / Date..." : "Write your story here..."}
                value={data.body}
                onChange={(e) => handleChange('body', e.target.value)}
                className={`w-full bg-transparent resize-none font-medium leading-relaxed border-2 border-transparent p-4 rounded-md
                    ${isCover ? 'text-lg text-gray-300 h-32 placeholder-gray-700' : 'flex-1 text-lg text-gray-700 placeholder-gray-300'}
                    hover:border-dashed hover:border-gray-200 focus:outline-none focus:border-[#A3E635]
                `}
            />
        )}
    </div>
  );
}
