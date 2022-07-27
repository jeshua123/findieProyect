import { useState, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'

import { Collapse, useMediaQuery } from '@material-ui/core'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'

type TFaqs = {
  title: string
  questions: { title: string; body: string }[]
}

type TQuestionsFaqs = {
  title: string
  questions: string[]
}

type TFaqsList = {
  faqs: TFaqs[]
  leftFaqsQuestions: TQuestionsFaqs[]
  rightFaqsQuestions: TQuestionsFaqs[]
}

const FaqsList: React.FC<TFaqsList> = (props) => {
  const isMobile = useMediaQuery('(max-width:415px)')
  const [openQuestionsLeft, setOpenQuestionsLeft] = useState(0)
  const [openQuestionsRight, setOpenQuestionsRight] = useState(0)
  const [freelancerFaqsList, setFreelancerFaqsList] = useState(props.faqs)
  const [selectedQuestion, setSelectedQuestion] = useState({ title: '' })

  const executeScroll = (id: string) => {
    //@ts-ignore
    document.getElementById(id).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  const openCollapse = (question: any, index: number, side: string) => {
    if (!isMobile) return
    if (side === 'left') {
      setOpenQuestionsRight(0)
      if (index === openQuestionsLeft) {
        setSelectedQuestion({ title: '' })
        setOpenQuestionsLeft(0)
        return
      }
      setSelectedQuestion(question)
      setOpenQuestionsLeft(index)
    }
    if (side === 'right') {
      setOpenQuestionsLeft(0)
      if (index === openQuestionsRight) {
        setSelectedQuestion({ title: '' })
        setOpenQuestionsRight(0)
        return
      }
      setSelectedQuestion(question)
      setOpenQuestionsRight(index)
    }
  }

  useEffect(() => {
    if (isMobile) {
      if (selectedQuestion.title !== '') {
        const listFiltered = props.faqs.filter((iter) => {
          if (!selectedQuestion.title.length) return true
          if (iter.title === selectedQuestion.title) {
            return true
          } else return false
        })
        setFreelancerFaqsList(listFiltered)
      } else setFreelancerFaqsList(props.faqs)
    }
  }, [selectedQuestion.title])

  return (
    <>
      <div className='grid grid-cols-12 mt-28 lg:gap-8 md:gap-4 gap-0 mb-12'>
        <div className='lg:col-span-5 md:col-span-6 col-span-12'>
          {props.leftFaqsQuestions.map((iter, index) => {
            return (
              <div key={iter.title + index} className='mt-8'>
                <span className='subtitle1-medium text-blue mt-4' onClick={() => openCollapse(iter, index + 1, 'left')}>
                  {iter.title}
                  {isMobile && openQuestionsLeft === index + 1 && <KeyboardArrowUpIcon fontSize='large' className='ml-2' />}
                  {isMobile && openQuestionsLeft !== index + 1 && <KeyboardArrowDownIcon fontSize='large' className='ml-2' />}
                </span>
                <Collapse in={!isMobile || openQuestionsLeft === index + 1}>
                  {iter.questions.map((questions) => {
                    return (
                      <p
                        key={questions + index}
                        className='body2-medium mt-6 cursor-pointer'
                        onClick={() => executeScroll(`${questions}`)}
                      >
                        {questions}
                      </p>
                    )
                  })}
                </Collapse>
              </div>
            )
          })}
        </div>
        <div className='lg:col-span-5 md:col-span-6 col-span-12'>
          {props.rightFaqsQuestions.map((iter, index) => {
            return (
              <div key={iter.title + index} className='mt-8'>
                <span className='subtitle1-medium text-blue mt-4' onClick={() => openCollapse(iter, index + 1, 'right')}>
                  {iter.title}
                  {isMobile && openQuestionsRight === index + 1 && <KeyboardArrowUpIcon fontSize='large' className='ml-2' />}
                  {isMobile && openQuestionsRight !== index + 1 && <KeyboardArrowDownIcon fontSize='large' className='ml-2' />}
                </span>
                {iter.questions.map((questions) => {
                  return (
                    <Collapse key={questions + index} in={!isMobile || openQuestionsRight === index + 1}>
                      <p className='body2-medium mt-6 cursor-pointer' onClick={() => executeScroll(`${questions}`)}>
                        {questions}
                      </p>
                    </Collapse>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
      <hr className='mb-12' />
      {freelancerFaqsList.map((iter, index) => {
        return (
          <div key={iter.title + index}>
            <span className='subtitle3-20 mt-6 block text-blue'>{iter.title}</span>
            {iter.questions.map((question, index) => {
              return (
                <div className='pt-6' id={question.title}>
                  <p key={question.title + index} className='body2-regular whitespace-pre-wrap'>
                    <span className='body2-medium bg-gray-100'>{question.title}</span> {question.body}
                  </p>
                </div>
              )
            })}
          </div>
        )
      })}
    </>
  )
}

export default FaqsList
