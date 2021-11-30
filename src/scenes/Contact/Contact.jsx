import React, {useState, useEffect} from 'react'
import {Grid, isWidthUp, withWidth} from '@material-ui/core'
import {EvolutionRequest, IncidentReporting} from './components'
import {Card, DefaultTitle, Select} from "../../components";
import * as Resources from "../../Resources";
import Formsy from 'formsy-react'

const types = [
    {id: 1, text: Resources.CONTACT_FORM_TYPE_EVOLUTION_OPTION},
    {id: 2, text: Resources.CONTACT_FORM_TYPE_INCIDENT_OPTION}
];


function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

const RulesIframe = ({...props}) => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isLg = isWidthUp('lg', props.width)
  const isMd = isWidthUp('md', props.width)
  const isSm = isWidthUp('sm', props.width)
  const isXs = isWidthUp('xs', props.width)
  let marginLeft = -20
  let width = '100vw'
  const marginTop = -20

  if(isLg) {
    marginLeft =  `-${((windowDimensions.width - 304 - 915) / 2)}px`
    width = `${windowDimensions.width - 304}px`
  } else if (isMd) {
    marginLeft =  `-${((windowDimensions.width - 915) / 2)}px`
    width = '100vw'

  } else if (isSm) {
    marginLeft = -20
    width = '100vw'

  } else if (isXs) {
    marginLeft = 0
    width = '100vw'

  }
  return (
    <iframe src="https://firetiger.fr/help" style={{width, height: 'calc(100vh + 20px)', marginTop, marginLeft}} frameBorder="0"/>
  )
}

const Contact = ({...props}) => {
    const [selectedType, setSelectedType] = React.useState(null);

    useEffect(() => {
        props.clear();
        props.handleTitle(Resources.CONTACT_TITLE);
        props.handleMaxWidth('md')
    });

    const handleTypeChange = (type) => {
        setSelectedType(type)
    };

    const iframeUrl = 'https://firetiger.fr/help'
    const Rules = withWidth()(RulesIframe)

    // <div>
    //   <Grid container spacing={4}>
    //     <Grid item xs={12}>
    //       <div>
    //         <Grid container spacing={1}>
    //           <Grid item xs={12}>
    //             <DefaultTitle>{Resources.CONTACT_QUESTION}</DefaultTitle>
    //           </Grid>
    //           <Grid item xs={12}>
    //             <Card>
    //               <Formsy>
    //                 <Select name='type' label={Resources.CONTACT_FORM_TYPE_LABEL} options={types} optionValueName='id' optionTextName='text' onChange={handleTypeChange} fullWidth />
    //               </Formsy>
    //             </Card>
    //           </Grid>
    //         </Grid>
    //       </div>
    //     </Grid>
    //     <Grid item xs={12}>
    //       { selectedType == 1 && <EvolutionRequest /> }
    //       { selectedType == 2 && <IncidentReporting /> }
    //     </Grid>
    //   </Grid>
    // </div>
    return (
      <div>
        <Rules />
      </div>
    )
};

export default Contact
