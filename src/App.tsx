import { useState } from "react";

function App() {
  const [cardHolderName, setCardHolderName] = useState<string>();
  const [cardNumber, setCarNumber] = useState<string>();
  const [cardExpMonth, setCardExpMonth] = useState<string>();
  const [cardExpYear, setCardExpYear] = useState<string>();
  const [cardCvc, setCardCvc] = useState<string>();

  const [isErrorFormat, setIsErrorFormat] = useState<boolean>(false);

  const [isForm, setIsForm] = useState<boolean>(true);


  const validateFormatCardDigit = (event:any)=> {
    const value:string = event?.target.value;
    const textWithouSpaces = value.split(' ').join('');
    let newValue:string = '';

    for (let index = 0; index < textWithouSpaces.length; index++) {
      const element = textWithouSpaces[index];
      if(index % 4 == 0 && index !=0) newValue+= ' ';
      newValue+= element;
    }

    setCarNumber(newValue)
    event.target.value = newValue;
  }

  const submit = ()=> {
    alert('on submit');
    setIsErrorFormat(true);
    setIsForm(false);
  }

  const showError = ()=> isErrorFormat && <span className="text-xs text-red-400 font-medium">Cant be blank</span>

  return (
    <div className="flex h-screen flex-col lg:flex-row">
      <nav className="lg:w-1/4 bg-red-200">
        <img src="./img/bg-main-mobile.png" alt="" className="lg:h-full w-full"/>
      </nav>
      <section className="bg-white lg:w-3/4 flex items-center justify-center h-full p-5">
        {isForm &&
          <div className="flex flex-col gap-5 lg:w-2/6">
            <div className="flex flex-col gap-1">
              <label htmlFor="card-holder-name" className="text-sm text-very_dark_violet">CARD HOLDER NAME</label>
              <input type="text" id="card-holder-name"
              placeholder="e.g Holder Name"
              onChange={(e)=> setCardHolderName(e.target.value)}
              className="appearance-none border focus:outline-none focus:border-violet-900 p-2 rounded-md"/>
              {showError()}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="card-holder-name" className="text-sm text-very_dark_violet">CARD NUMBER</label>
              <input type="text" id="card-holder-name"
              maxLength={19}
              placeholder="e.g 1234 5678 9123 0000"
              onKeyUp={(e)=> validateFormatCardDigit(e)}
              className={`appearance-none border focus:outline-none focus:border-violet-900 p-2 rounded-md ${isErrorFormat && 'border-red-500'}`}/>
              {showError()}
            </div>

            <div className="flex gap-2">
              <div className="flex flex-col gap-1">
                <label htmlFor="card-holder-name" className="text-sm text-very_dark_violet">Exp. Date (MM/YY)</label>
                <div className="flex gap-2">
                  <input type="text" id="card-holder-name"
                  onChange={(e)=> setCardExpMonth(e.target.value)}
                  placeholder="MM"
                  className="appearance-none border focus:outline-none focus:border-violet-900 p-2 rounded-md w-20"/>

                  <input type="text" id="card-holder-name"
                  maxLength={2}
                  onChange={(e)=> setCardExpYear(e.target.value)}
                  placeholder="YY"
                  className="appearance-none border focus:outline-none focus:border-violet-900 p-2 rounded-md w-20"/>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="card-holder-name" className="text-sm text-very_dark_violet">CVC</label>
                <input type="text" id="card-holder-name"
                maxLength={3}
                onChange={(e)=> setCardCvc(e.target.value)}
                placeholder="e.g 123"
                className="appearance-none border focus:outline-none focus:border-violet-900 p-2 rounded-md w-full"/>
              </div>
            </div>

            <button className="bg-very_dark_violet text-white p-4 rounded-md" onClick={submit}>Confirm</button>
          </div>
        }
        {!isForm &&
          <div className="flex flex-col gap-5 lg:w-2/6">
            <div className="flex flex-col items-center gap-2">
              <div className="mb-5">
                <svg width="80" height="80" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="40" cy="40" r="40" fill="url(#a)"/><path d="M28 39.92 36.08 48l16-16" stroke="#fff" stroke-width="3"/><defs><linearGradient id="a" x1="-23.014" y1="11.507" x2="0" y2="91.507" gradientUnits="userSpaceOnUse"><stop stop-color="#6348FE"/><stop offset="1" stop-color="#610595"/></linearGradient></defs></svg>
              </div>
              <span className="text-3xl uppercase text-very_dark_violet">Thank you!</span>
              <span className="text-lg text-slate-500">We've added your card details</span>
            </div>
            <button className="bg-very_dark_violet text-white p-4 rounded-md">Continue</button>
          </div>
        }
      </section>

      <div className="absolute w-screen lg:w-[35%] lg:top-40 lg:left-32">
        <div className="flex lg:flex-col flex-col-reverse lg:gap-10">
          <div className="relative z-10 bottom-5 left-4 lg:bottom-0 lg:left-0">
            <img src="./img/bg-card-front.png" alt="" className="w-72 lg:w-96"/>
            <div className="absolute top-0 w-72 lg:w-96 h-full p-5 text-white">
              <div className="flex flex-col justify-between h-full">
                <div className="flex items-center gap-2">
                  <span className="w-10 h-10 rounded-full bg-white"></span>
                  <span className="w-4 h-4 rounded-full border"></span>
                </div>
                <div className="flex flex-col lg:gap-5">
                    <span className="text-xl lg:text-3xl">{cardNumber || '0000 0000 0000 000'}</span>
                    <div className="flex justify-between text-sm">
                        <span>{cardHolderName || 'Holder Name'}</span>
                        <span>{`${cardExpMonth || '00'}/${cardExpYear || '00'}`}</span>
                    </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end relative top-10 right-5 lg:top-0 lg:right-0">
            <img src="./img/bg-card-back.png" alt="" className="w-72 lg:w-96"/>
            <div className="absolute top-0 w-72 lg:w-96 h-full p-12 text-white">
              <div className="flex justify-end items-center h-full text-sm">{cardCvc || '000'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
