import { Field, Form, Formik, useFormikContext } from 'formik';
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
  ISUP: 4
}

/**
 * Start editing your calculator here ⬇. 
 * You can but basic JS logic in the body of the function and use the `return` statement for the HTML that should be rendered.
 */
export function Calculator() {

  // 💡 the variable values provides access to all the current values of the form
  const { values } = useFormikContext<typeof INITIAL_VALUES>()

  const µ = (values.intercept + (values.mpMRI * 0.3833) + (values.iPSA * 0.0228) + (values.tumorlenght * 0.1443) + (values.ISUP * 0.6220))
  const result = Math.exp(µ)/(1+Math.exp(µ)) *100
  let percentage = result.toPrecision(2)


  // here comes the HTML for your calculator
  return (
    <Form className='rounded-lg'>
      <h1 className="text-3xl font-bold">
        Risico op lymfeklierinvasie
      </h1>
      <p>Draulans C, Everaerts W, Isebaert S, Van Bruwaene S, Gevaert T, Oyen R, Joniau S, Lerut E, De Wever L, Laenen A, Weynand B, Defraene G, Vanhoutte E, De Meerleer G, Haustermans K. Development and External Validation of a Multiparametric Magnetic Resonance Imaging and International Society of Urological Pathology Based Add-On Prediction Tool to Identify Prostate Cancer Candidates for Pelvic Lymph Node Dissection. J Urol. 2020 Apr;203(4):713-718. doi: 10.1097/JU.0000000000000652. Epub 2019 Nov 13. PMID: 31718396.</p>
      <div className="mt-2">
        <label className='mx-1'>
          mpMRI based T stage:
        </label>
        {/** Notice the `name="a"` attribute! Use this key to retrieve the value of this field: `values.a` */}
        <Field className="rounded text-blue-900" type="radio" name="mpMRI" value="1"/><label className="mx-1">cT1c</label>
        <Field className="rounded text-blue-900" type="radio" name="mpMRI" value="2"/><label className="mx-1">cT2a</label>
        <Field className="rounded text-blue-900" type="radio" name="mpMRI" value="3"/><label className="mx-1">cT2b</label>
        <Field className="rounded text-blue-900" type="radio" name="mpMRI" value="4"/><label className="mx-1">cT2c</label>
        <Field className="rounded text-blue-900" type="radio" name="mpMRI" value="5"/><label className="mx-1">cT3a</label>
        <Field className="rounded text-blue-900" type="radio" name="mpMRI" value="6"/><label className="mx-1">cT3b</label>
        <Field className="rounded text-blue-900" type="radio" name="mpMRI" value="7"/><label className="mx-1">cT4</label>

      </div>
      <div className="mt-2">
        <label className='mx-1'>
          iPSA (ng/mL):
        </label>
        
        <Field className="rounded-md border-gray-400" type="number" name="iPSA" />
      </div>
      <div className="mt-2">
        <label className='mx-1'>
          Maximum tumor length in one core (mm):
        </label>
        <Field className="rounded-md border-gray-400" type="number" name="tumorlenght"  />
      </div>
      <div className="mt-2">
        <label className='mx-1'>
          ISUP grade:
        </label>
        <Field className="rounded-md border-gray-400 disabled:bg-gray-50" as="select" name="ISUP">
          <option value="1">ISUP 1</option>
          <option value="2">ISUP 2</option>
          <option value="3">ISUP 3</option>
          <option value="4">ISUP 4</option>
          <option value="5">ISUP 5</option>
        </Field>
        
        <h1 className="text-2xl text-blue-900 font-bold">result: {percentage}%</h1>
        
      </div>
    </Form>
  )
}

/**
 * This App component serves as a container of the calculator and will handle all state updates of the value
 * 
 */
export default function App() {
  return (
    <div id="page-container" className="px-5 py-3">
      <Formik initialValues={INITIAL_VALUES} onSubmit={(values) => console.log(values)}>
        <Calculator />
      </Formik>
    </div>
  )
}