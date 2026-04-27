import caseSchema from './case'
import methodSchema from './method'
import serviceSchema from './service'
import columnSchema from './column'
import industryCategorySchema from './industryCategory'
import ctaConfigSchema from './ctaConfig'
import contactSubmissionSchema from './contactSubmission'
import requestSubmissionSchema from './requestSubmission'
import callout from './objects/callout'
import linkCard from './objects/linkCard'
import metric from './objects/metric'
import codeBlock from './objects/codeBlock'

export const schemaTypes = [
  // コンテンツ
  caseSchema,
  methodSchema,
  serviceSchema,
  columnSchema,
  industryCategorySchema,
  ctaConfigSchema,
  // 送信フォーム
  contactSubmissionSchema,
  requestSubmissionSchema,
  // インラインオブジェクト
  callout,
  linkCard,
  metric,
  codeBlock,
]
