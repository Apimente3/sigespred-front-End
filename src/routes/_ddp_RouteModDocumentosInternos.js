import { getDefaultNormalizer } from '@testing-library/react'
import React from 'react'
import DocInternoAdd from '../sigespred/_ddp_documentos_internos/DocInternoAdd'
import DocInternos from '../sigespred/_ddp_documentos_internos/DocInternos'

const RouteModDocumentosInternos =  [
    {path: "/", component: DocInternos},
    {path: "/docinternos", component: DocInternos},
    {path: "/docinternos-add", component: DocInternoAdd},
]
export default RouteModDocumentosInternos
