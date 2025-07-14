import { useState, useRef, useEffect } from 'react'
import "./styles.css"
import "../../markdown-styles.css"
import SETTINGS from "../../settings.json"
import { capitalizeString } from '../../utils'
import Input, { BaseContainer } from '../../components/input'
import ReactMarkdown from 'react-markdown'

const NotesPage = () => {

  const OPENING_WORDS = SETTINGS['opening-words']
  const [currentlyDisplayedWords, setCurrentlyDisplayedWords] = useState((() => {
    if(OPENING_WORDS.length === 0){
      return []
    }else if(OPENING_WORDS.length === 1){
      return Array.from(new Array(4).map(() => OPENING_WORDS[0]))
    }else if(OPENING_WORDS.length === 2){
      return [
        OPENING_WORDS[0], OPENING_WORDS[1],
        OPENING_WORDS[0], OPENING_WORDS[1],
      ]
    }else if(OPENING_WORDS.length === 3){
      return [
        OPENING_WORDS[0], OPENING_WORDS[1],
        OPENING_WORDS[2], OPENING_WORDS[0],
      ]
    }
    return [
      OPENING_WORDS[0], OPENING_WORDS[1],
      OPENING_WORDS[2], OPENING_WORDS[3],
    ]
  })())
  const [note, setNote] = useState("")

  const cubeRef = useRef<HTMLDivElement>(null)
  const rotateDeg = useRef<number>(0)
  const displayPointerIndex = useRef<number>(0)
  const replacementIndex = useRef<number>(OPENING_WORDS.length === 3 ? 1 : 4)

  useEffect(() => {
    const setIntervalId = setInterval(() => {
      doRotation()
    }, 3000)

    return () => {
      clearInterval(setIntervalId)
    }
  }, [])

  const doRotation = () => {
    if(!cubeRef.current) return;

    if(rotateDeg.current > 100000){
      rotateDeg.current = 0
      cubeRef.current.style.transition = "none";
    }else{
      rotateDeg.current += 90
      cubeRef.current.style.transition = "300ms all ease";
    }

    cubeRef.current.style.rotate = `1 0 0 ${rotateDeg.current}deg`

    if(OPENING_WORDS.length <= 4 && OPENING_WORDS.length !== 3) return;

    displayPointerIndex.current += 1

    if(displayPointerIndex.current > 3){
      displayPointerIndex.current = 0;
    }
    let replacingAtIndex = displayPointerIndex.current - 1
    if(replacingAtIndex < 0){
      replacingAtIndex = 3
    }
    const replacementWord = OPENING_WORDS[replacementIndex.current]
    replacementIndex.current += 1
    if(replacementIndex.current >= OPENING_WORDS.length){
      replacementIndex.current = 0
    }

    setTimeout(() => {
      setCurrentlyDisplayedWords((prevState) => {
        const copied = [...prevState]
        copied[replacingAtIndex] = replacementWord
        return copied
      })
    }, 500);
  }

  return (
    <div className='h-full min-h-[100vh] flex flex-col items-center w-full gap-8'>
      <div className='text-center mt-20'>
        <div className='text-3xl flex flex-col'>
          <div>So, what did you</div>
          <div className='words-container text-5xl font-bold'>
            <div className='words-cube' ref={cubeRef}>
              <div className='first-word'>{capitalizeString(currentlyDisplayedWords[0])}?</div>
              <div className="second-word">{capitalizeString(currentlyDisplayedWords[1])}?</div>
              <div className="third-word">{capitalizeString(currentlyDisplayedWords[2])}?</div>
              <div className="fourth-word">{capitalizeString(currentlyDisplayedWords[3])}?</div>
            </div>
          </div>
        </div>
        <p>Write down something new you discovered today</p>
      </div>
      <form className='flex flex-col self-stretch mt-8 lg:gap-4 gap-8'>
        <div className='flex gap-4 lg:gap-8 lg:flex-row flex-col items-center'>
          <Input
            label='Title'
            outerClassname='w-full lg:max-w-[20rem]'
          />
          <Input.Date
            label='Date'
            outerClassname='w-full lg:max-w-[20rem]'
          />
        </div>
        <div>
          <BaseContainer label='Tags'>
            <p>Pass</p>
          </BaseContainer>
        </div>
        <div className='grid gap-4 lg:grid-cols-2'>
          <Input.TextArea
            label='Notes Markdown'
            value={note}
            onChange={(ev) => setNote(ev.target.value)}
            outerClassname='h-[30rem]'
          />
          <div className='flex flex-col h-[30rem]'>
            <p className='font-bold text-xl mb-2'>Content</p>
            <div className='markdown-parent flex-auto p-1 border-2 border-solid border-white/50 focus:border-white rounded-md outline-none transition-all overflow-auto'>
              <ReactMarkdown>
                {note}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </form>
      <div>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis ullam voluptate non consequatur natus ipsum vel nihil minima a, amet cupiditate enim laborum ex assumenda eligendi quibusdam dolor obcaecati dolorum voluptatem, similique tempore voluptatum aperiam sed! Minima, neque mollitia. Et mollitia sint quaerat in aperiam inventore corrupti, expedita dignissimos beatae.</p>
      </div>

    </div>
  )
}

export default NotesPage