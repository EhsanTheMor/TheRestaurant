import React, { useRef } from 'react'

type Props = {
     item: string;
     active: boolean;
     setActive: () => void
}

export default function AccountSelectIndicator({ item, active, setActive }: Props) {
     const highLight = useRef<HTMLSpanElement>(null)

     return (
          <>
               <h1 className={active ? 'account_list_item  text-[#3550FF]' : 'account_list_item text-white'} onClick={setActive}>
                    <span className='relative z-50'>{item}</span>
                    <span ref={highLight} className={active ? 'heightlight' : 'heightlight hidden'}>
                         <span className="heightlight_upper_part">U</span>
                         <span className="heightlight_lower_part">L</span>
                    </span>
               </h1 >
          </>
     )
}
