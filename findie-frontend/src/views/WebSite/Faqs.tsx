import { useEffect, useState } from 'react'
import { useWebSiteLayout } from '../../customHooks/useWebSiteLayout'
import { freelancerFaqs, freelancerFaqsLeft, freelancerFaqsRight } from '../../constants/WebSite/FaqsConstants'
import { clientsFaqs, clientsFaqsLeft, clientsFaqsRight } from '../../constants/WebSite/FaqsConstants'

import WebSiteStructure from '../../layout/WebSite/WebSiteStructure'
import SectionStructure from '../../layout/WebSite/SectionStructure'
import FaqsList from '../../components/WebSite/Faqs/FaqsList'

import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import FiButton from '../../assets/UIkit/FiButton'
import routes from '../../constants/routes'

const Faqs: React.FC = () => {
  const { view, setView } = useWebSiteLayout()
  const [faqSelected, setFaqSelected] = useState<string>('freelancer')

  useEffect(() => {
    setView({ path: 'faqs', bgColor: 'web-bg-white', textColor: 'text-black', textColor2: 'text-white' })
  }, [])

  return (
    <WebSiteStructure>
      <SectionStructure>
        <h1 className={`${view.textColor}`}>
          Preguntas <br /> frecuentes
        </h1>

        <div className={`mt-40 flex ${view.textColor}`}>
          <span
            className='buttontext3-bold text-left md:inline block cursor-pointer'
            onClick={() => setFaqSelected('freelancer')}
          >
            FREELANCERS
            {faqSelected === 'freelancer' ? (
              <KeyboardArrowDownIcon fontSize='large' className='ml-2' />
            ) : (
              <KeyboardArrowUpIcon fontSize='large' className='ml-2' />
            )}
          </span>
          <h4 className='md:mx-8 mx-4'>/</h4>
          <span className='buttontext3-bold text-left md:inline block cursor-pointer' onClick={() => setFaqSelected('client')}>
            CLIENTES
            {faqSelected === 'client' ? (
              <KeyboardArrowDownIcon fontSize='large' className='ml-2' />
            ) : (
              <KeyboardArrowUpIcon fontSize='large' className='ml-2' />
            )}
          </span>
        </div>

        {faqSelected === 'freelancer' && (
          <>
            <FaqsList faqs={freelancerFaqs} leftFaqsQuestions={freelancerFaqsLeft} rightFaqsQuestions={freelancerFaqsRight} />
            <div className='total-center mt-20'>
              <p className='formtext2-regular'>¿Quieres iniciar tu postulación?</p>
              <div>
                <FiButton
                  asLink
                  to={routes.web_site.freelancer_suscription_form.step_zero}
                  variant='outlined'
                  className='py-0 ml-6'
                >
                  Inscribete aquí
                </FiButton>
              </div>
            </div>
          </>
        )}
        {faqSelected === 'client' && (
          <>
            <FaqsList faqs={clientsFaqs} leftFaqsQuestions={clientsFaqsLeft} rightFaqsQuestions={clientsFaqsRight} />
            <div className='total-center mt-20'>
              <p className='formtext2-regular'>¿Iniciemos la búsqueda de freelancer?</p>
              <div>
                <FiButton asLink to={routes.web_site.client_suscription_form.step_zero} variant='outlined' className='py-0 ml-6'>
                  Buscar freelancer
                </FiButton>
              </div>
            </div>
          </>
        )}
      </SectionStructure>
    </WebSiteStructure>
  )
}

export default Faqs
