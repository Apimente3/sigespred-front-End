import { getDefaultNormalizer } from '@testing-library/react'
import React from 'react'
import DocInternoAdd from '../sigespred/_ddp_documentos_internos/DocInternoAdd'
import DocInternoEdit from '../sigespred/_ddp_documentos_internos/DocInternoEdit'
import DocInternoDel from '../sigespred/_ddp_documentos_internos/DocInternoDel'
import DocInternos from '../sigespred/_ddp_documentos_internos/DocInternos'
import DocInternoRespuesta from '../sigespred/_ddp_documentos_internos/DocInternoRespuesta'

const RouteModDocumentosInternos =  [
    {path: "/", component: DocInternos},
    {path: "/docinternos", component: DocInternos},
    {path: "/docinternos-add", component: DocInternoAdd},
    {path: "/docinternos-edit/:id", component: DocInternoEdit},
    {path: "/docinternos-del/:id", component: DocInternoDel},
    {path: "/docinternos-respuesta/:id", component: DocInternoRespuesta}
]
export default RouteModDocumentosInternos
