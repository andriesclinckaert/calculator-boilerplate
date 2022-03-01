import { Field, Form, Formik, FormikHelpers, useFormikContext } from 'formik';
import { useCallback, useEffect } from 'react';
import './App.css';


/** 
 * Here your can place the initial values of your calculator. 
 * The key in the detect corresponds to the attribute `name=...` you'll use for the corresponding field.
 */
const INITIAL_VALUES = {
  intercept: -6.4605,
  mpMRI: 1,
  iPSA: 3,
  tumorlenght: 3,
  ISUP: 3,
  result: 0
}
type Values = typeof INITIAL_VALUES

/**
 * Start editing your calculator here ⬇. 
 * You can but basic JS logic in the body of the function and use the `return` statement for the HTML that should be rendered.
 */
export function Calculator() {

  // 💡 the variable values provides access to all the current values of the form
  const { values, setFieldValue, submitForm } = useFormikContext<Values>()

  const µ = (values.intercept + (values.mpMRI * 0.3833) + (values.iPSA * 0.0228) + (values.tumorlenght * 0.1443) + (values.ISUP * 0.6220))
  const result = Math.exp(µ) / (1 + Math.exp(µ)) * 100
  let percentage = result.toPrecision(2)

  useEffect(() => { setFieldValue("result", percentage); setTimeout(submitForm, 0) }, [percentage])
  useEffect(() => {
    window.addEventListener("beforeunload", submitForm)
    return () => window.removeEventListener("close", submitForm)
  }, [submitForm])

  // here comes the HTML for your calculator
  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="mt-6 text-center text-3xl font-bold text-blue-700">
            Risico op lymfeklierinvasie
          </h1>
          <p className="mt-2 text-center text-xs text-gray-500 font-serif">Draulans C, Everaerts W, Isebaert S, Van Bruwaene S, Gevaert T, Oyen R, Joniau S, Lerut E, De Wever L, Laenen A, Weynand B, Defraene G, Vanhoutte E, De Meerleer G, Haustermans K. Development and External Validation of a Multiparametric Magnetic Resonance Imaging and International Society of Urological Pathology Based Add-On Prediction Tool to Identify Prostate Cancer Candidates for Pelvic Lymph Node Dissection. J Urol. 2020 Apr;203(4):713-718. doi: 10.1097/JU.0000000000000652. Epub 2019 Nov 13. PMID: 31718396.</p>
        </div>
        <Form className="rounded-md">
          <div className="mt-2">
            <label className='block text-sm font-medium text-gray-700'>
              mpMRI based T stage:
            </label>
            {/** Notice the `name="a"` attribute! Use this key to retrieve the value of this field: `values.a` */}
            <Field className="rounded text-blue-700" type="radio" name="mpMRI" value="1" /><label className="mx-1">cT1c</label>
            <Field className="rounded text-blue-700" type="radio" name="mpMRI" value="2" /><label className="mx-1">cT2a</label>
            <Field className="rounded text-blue-700" type="radio" name="mpMRI" value="3" /><label className="mx-1">cT2b</label>
            <Field className="rounded text-blue-700" type="radio" name="mpMRI" value="4" /><label className="mx-1">cT2c</label>
            <Field className="rounded text-blue-700" type="radio" name="mpMRI" value="5" /><label className="mx-1">cT3a</label>
            <Field className="rounded text-blue-700" type="radio" name="mpMRI" value="6" /><label className="mx-1">cT3b</label>
            <Field className="rounded text-blue-700" type="radio" name="mpMRI" value="7" /><label className="mx-1">cT4</label>

          </div>
          <div className="mt-2">
            <label className='block text-sm font-medium text-gray-700'>
              iPSA (ng/mL):
            </label>

            <Field className="t-1 block shadow-sm sm:text-sm border-gray-300 rounded-md" type="number" name="iPSA" min="0" max="10000" />
          </div>
          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
            <label className='block text-sm font-medium text-gray-700'>
              Maximum tumor length in one core (mm):
            </label>
            <Field className="t-1 block shadow-sm sm:text-sm border-gray-300 rounded-md" type="number" name="tumorlenght" min="0" max="100" />
          </div>
          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
            <label className='block text-sm font-medium text-gray-700'>
              ISUP grade:
            </label>
            <Field className="t-1 block shadow-sm sm:text-sm border-gray-300 rounded-md" as="select" name="ISUP">
              <option value="1">ISUP 1</option>
              <option value="2">ISUP 2</option>
              <option value="3">ISUP 3</option>
              <option value="4">ISUP 4</option>
              <option value="5">ISUP 5</option>
            </Field>
          </div>
          <div className="col-span-6 sm:col-span-3 lg:col-span-2 block">
            <label className="block font-bold text-gray-700">Resultaat:</label>
            <h1 className="text-2xl text-center items-center justify-center px-5 py-3 border border-transparent font-medium rounded-md text-blue-700 bg-indigo-50 hover:bg-indigo-300">{percentage}%</h1>
          </div>
        </Form>
      </div>
    </div>
  )
}

/**
 * This App component serves as a container of the calculator and will handle all state updates of the value
 * 
 */
export default function App() {
  const handleSubmit = useCallback((values: Values, helpers: FormikHelpers<Values>) => {
    const observation = {
      resourceType: "Observation",
      code: {
        text: "Risico op Lymfeklierinvasie",
      },
      valueQuantity: {
        value: values.result,
        unit: "%",
        code: "%",
        system: "http://unitsofmeasure.org"
      }
    }
    console.log("calculator", observation)
    window.parent.postMessage(observation, "http://localhost:6006")
    helpers.resetForm({ values })
  }, [])
  return (
    <div id="page-container" className="px-5 py-3">
      <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit}>
        <Calculator />
      </Formik>
    </div>
  )
}
