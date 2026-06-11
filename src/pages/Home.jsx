import Header from '../components/layout/Header.jsx'
import Footer from '../components/layout/Footer.jsx'

import Hero            from '../components/sections/Hero/Hero.jsx'
import PlatformOverview from '../components/sections/PlatformOverview/PlatformOverview.jsx'
import IndustryProblem from '../components/sections/IndustryProblem/IndustryProblem.jsx'
import AnalysisCTA     from '../components/sections/AnalysisCTA/AnalysisCTA.jsx'
import ProductsIntro   from '../components/sections/ProductsIntro/ProductsIntro.jsx'
import InvoiceIQOverview  from '../components/sections/InvoiceIQ/Overview.jsx'
import InvoiceIQFeatures  from '../components/sections/InvoiceIQ/Features.jsx'
import InvoiceIQExceptions from '../components/sections/InvoiceIQ/ExceptionIntelligence.jsx'
import ContractIQOverview from '../components/sections/ContractIQ/Overview.jsx'
import ContractIQFeatures from '../components/sections/ContractIQ/Features.jsx'
import ContractIQValidation from '../components/sections/ContractIQ/ValidationProvenance.jsx'
import PlatformROI     from '../components/sections/PlatformROI/PlatformROI.jsx'
import Security        from '../components/sections/Security/Security.jsx'
import Integrations    from '../components/sections/Integrations/Integrations.jsx'
import Clients         from '../components/sections/Clients/Clients.jsx'
import CaseStudy       from '../components/sections/CaseStudy/CaseStudy.jsx'
import FAQ             from '../components/sections/FAQ/FAQ.jsx'
import FooterCTA       from '../components/sections/FooterCTA/FooterCTA.jsx'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <PlatformOverview />
        <IndustryProblem />
        {/* <AnalysisCTA /> */}
        <ProductsIntro />
        <InvoiceIQOverview />
        <InvoiceIQFeatures />
        <InvoiceIQExceptions />
        <ContractIQOverview />
        <ContractIQFeatures />
        <ContractIQValidation />
        <PlatformROI />
        <Security />
        <Integrations />
        <Clients />
        <CaseStudy />
        <FAQ />
        <FooterCTA />
      </main>
      <Footer />
    </>
  )
}
