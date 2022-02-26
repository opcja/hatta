import React from "react"
import ReactDOM from "react-dom"
import {
  Formik,
  useField,
  Form,
  ErrorMessage,
  useFormik,
  FormikProvider,
} from "formik"
import * as Yup from "yup"
import { navigate } from "gatsby-link"
import styled from "styled-components"

const Describtion = styled.p`
  width: 32%;
  margin-bottom: 36px;
`

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 36px 0;

  .form-control {
    width: 60%;
  }

  .form-control.valid input,
  .form-control.valid input:focus,
  .form-control.valid textarea,
  .form-control.valid textarea:focus {
    border-color: green;
  }

  .form-control.valid .feedback {
    color: green;
  }

  .form-control.invalid input,
  .form-control.invalid input:focus,
  .form-control.invalid textarea,
  .form-control.invalid textarea:focus {
    border-color: red;
  }

  .form-control.invalid .feedback {
    color: red;
  }

  .form-control.textarea-field {
    width: 120%;
  }

  .text-xs {
    font-size: 12px;
    margin-bottom: 6px;
  }

  .label-box {
    display: flex;
    justify-content: space-between;

    margin-bottom: 4px;
    margin-top: 12px;
  }

  .feedback {
    font-size: 12px;
  }

  label {
    font-weight: 600;
    font-size: 13px;
  }

  input {
    width: 100%;
    height: 38px;
    padding-left: 4px;
    margin-bottom: 2px;
    font-size: 16px;
  }

  input,
  textarea {
    border: 2px solid #e0e0e0;
    border-radius: 5px;
  }

  input:focus,
  textarea:focus {
    outline: transparent;
    border: 2px solid #2196f3;
  }

  input:focus:hover,
  textarea:focus:hover {
    border: 2px solid #2196f3;
  }

  input:hover,
  textarea:hover {
    border-color: #bdbdbd;
  }

  textarea {
    height: 160px;
    width: 100%;
    padding: 4px;
    font-size: 16px;
  }

  button {
    margin-top: 24px;
    height: 35px;
    width: 30%;
    color: white;
    background-color: black;
  }
`

// function encode(data) {
//   return Object.keys(data)
//     .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
//     .join("&")
// }

// export default function Contact() {
//   const [state, setState] = React.useState({})

//   const handleChange = e => {
//     setState({ ...state, [e.target.name]: e.target.value })
//   }

//   const handleSubmit = e => {
//     e.preventDefault()
//     const form = e.target
//     fetch("/", {
//       method: "POST",
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//       body: encode({
//         "form-name": form.getAttribute("name"),
//         ...state,
//       }),
//     })
//       .then(() => navigate(form.getAttribute("action")))
//       .catch(error => alert(error))
//   }

const sleep = ms => new Promise(r => setTimeout(r, ms))

const TextInputLiveFeedback = ({ label, helpText, ...props }) => {
  const [field, meta] = useField(props)

  // Show inline feedback if EITHER
  // - the input is focused AND value is longer than 2 characters
  // - or, the has been visited (touched === true)
  const [didFocus, setDidFocus] = React.useState(false)
  const handleFocus = () => setDidFocus(true)
  const showFeedback =
    (!!didFocus && field.value.trim().length > 2) || meta.touched

  return (
    <div
      className={
        `${props.as ? `${props.as}-field ` : ""}` +
        `form-control ${showFeedback ? (meta.error ? "invalid" : "valid") : ""}`
      }
    >
      <div className="label-box flex items-center space-between">
        <label htmlFor={props.id}>{label}</label>{" "}
        {showFeedback ? (
          <div
            id={`${props.id}-feedback`}
            aria-live="polite"
            className="feedback text-sm"
          >
            {meta.error ? meta.error : "✓"}
          </div>
        ) : null}
      </div>
      {props.as ? (
        <textarea
          {...props}
          {...field}
          aria-describedby={`${props.id}-feedback ${props.id}-help`}
          onFocus={handleFocus}
        />
      ) : (
        <input
          {...props}
          {...field}
          aria-describedby={`${props.id}-feedback ${props.id}-help`}
          onFocus={handleFocus}
        />
      )}

      <div className="text-xs" id={`${props.id}-help`} tabIndex="-1">
        {helpText}
      </div>
    </div>
  )
}

const SignupForm = () => {
  function encode(data) {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&")
  }

  const [state, setState] = React.useState({})

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    const form = e.target
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        ...state,
      }),
    })
      .then(() => navigate(form.getAttribute("action")))
      .catch(error => alert(error))
  }

  const formik = useFormik({
    initialValues: { name: "", email: "", message: "" },
    onSubmit: async values => {
      await sleep(500)
      alert(JSON.stringify(values, null, 2))
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Must be 15 characters or less")
        .required("Required")
        .matches(
          /^[a-zA-Z0-9]+$/,
          "Cannot contain special characters or spaces"
        ),
      email: Yup.string().email("Invalid email address").required("Required"),
      message: Yup.string()
        .min(12, "Wiadomośc nie może byc krótsza niż 12 znaków")
        .required("Required"),
    }),
  })

  return (
    <>
      <h1>contact</h1>
      <Describtion>
        While artists work from real to the abstract, architects must work from
        the abstract to the real.{" "}
      </Describtion>
      <p>
        <strong>Contact reason</strong>
      </p>
      <p>
        <strong>project</strong> | cooperation | other
      </p>
      <FormikProvider value={formik}>
        <StyledForm
          name="contact"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="form-name" value="contact" />
          <p hidden>
            <label>
              Don’t fill this out:{" "}
              <input name="bot-field" onChange={handleChange} />
            </label>
          </p>
          <TextInputLiveFeedback
            label="name"
            id="name"
            helpText="Imię powinno zawierać min 3 znaki"
            name="name"
            type="text"
            onChange={handleChange}
          />
          <TextInputLiveFeedback
            label="email"
            id="email"
            helpText="Podaj poprawny adres e-mail"
            name="email"
            type="text"
            onChange={handleChange}
          />

          <TextInputLiveFeedback
            as="textarea"
            label="message"
            id="message"
            helpText="Wiadomość powinna być nie krótsza niz 6 znaków"
            name="message"
            type="text"
            onChange={handleChange}
          />

          <button type="submit">Send message</button>
          <button type="reset">Reset</button>
        </StyledForm>
      </FormikProvider>
    </>
  )
}

export default SignupForm
