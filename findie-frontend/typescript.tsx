import { Button } from '@material-ui/core'
import { PropsWithChildren, ReactElement } from 'react'

// Type an function that return someting
const setPageContent: () => { title: string; link: string; linkText: string } | undefined = () => {
  return { title: 'Titulo', link: '/titulo', linkText: 'titulo' }
}

// Type an funnction with no return
const foo: () => void = () => {
  2 + 2
}

// Type an funnction with params
const bass = (arg: string, e: number) => {
  arg + e
}

// Type .................................................................................................
type TOtherComponent = {
  a: string
}

type TComponent = {
  a: string
  b: number
  c: any[]
  d: TOtherComponent[]
  e: (e: any) => void
  f: () => { [key: string]: string | string | number | TOtherComponent }
  g: 'asd' | 'qwe' | 'cvb'
  h: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> //React Element type
  i: ReactElement //Html element
  j: { [key: string]: string }
  k: any
  event: React.ChangeEvent<HTMLInputElement> //(onchange events)
  object: Record<string, any>
  setState; Dispatch<SetStateAction<TRequestAction>>
}

// Typing functions .................................................................................................
// Type a function component 1: without props
const ComponentWithoutProps1 = () => {
  return <p>hola Nundo</p>
}

// Type a function component 1: with props
type TComponentWithProps1 = {
  title: 'Hola nundo'
}
const TComponentWithProps1 = (props: TComponentWithProps1) => {
  return <p>{props.title}</p>
}

// Type a function component 1: with props.children
const Component101 = (props: PropsWithChildren<any>) => {
  return <>{props.children}</>
}

// Type a function component 1: with props.children and props
type TComponentWithChildrenAndProps1 = {
  title: 'Hola mundo'
}
const ComponentWithChildrenAndProps1 = (props: PropsWithChildren<TComponentWithChildrenAndProps1>) => {
  return (
    <>
      {props.children}
      <p>{props.title}</p>
    </>
  )
}
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// Type a function component 2: without props
const ComponentWithoutProps2: React.FC = () => {
  return <p>hola Nundo</p>
}

// Type a function component 2: with props
type TComponentWithProps2 = {
  title: 'Hola nundo'
}
const ComponentWithProps2: React.FC<TComponentWithProps2> = (props) => {
  return <p>{props.title}</p>
}

// Type a function component 2: with props.children
const ComponentWithChildren2: React.FC = (props: PropsWithChildren<any>) => {
  return (
    <>
      {props.children}
      <p>{props.title}</p>
    </>
  )
}

// Type a function component 2: with props.children and props
type TComponentWithChildrenAndProps2 = {
  title: 'Hola mundo'
}
const ComponentWithChildrenAndProps2: React.FC<TComponentWithChildrenAndProps2> = (props: PropsWithChildren<any>) => {
  return (
    <>
      {props.children}
      <p>{props.title}</p>
    </>
  )
}

//Upload files
;<Box>
  <Button
    variant='outlined'
    component='label'
    color='primary'
    size='small'
    fullWidth
    type='button'
    style={{ backgroundColor: 'rgba(63, 81, 181, 0.08)' }}
  >
    icono + Buscar archivo
    <TextField
      type='file'
      id='exam'
      onChange={(event) => {
        setFile(event.target.files)
      }}
      fullWidth
      my={2}
      style={{ display: 'none' }}
      accept={('pdf', 'jpg', 'jpeg', 'png')}
      name='upLoadFile'
      inputRef={register({
        required: 'Campo Obligatorio',
      })}
    />
  </Button>
  <span className={classes.microText}>PDF o JPG</span>
  <span>{errors?.upLoadFile?.message}</span>
</Box>


// const submit = (values: LoginFormValues) => {
//   tokenMutation.mutate(
//     {
//       username: values.email,
//       password: values.password,
//       grant_type: "password",
//       client_id: social_auth_keys.client_id,
//       client_secret: social_auth_keys.client_secret,
//     },
//     { onSuccess: onSuccessLogin }
//   );
// };
// const onSuccessLogin = (data: TokenSuccessResponse) => {
//   saveToken(data.access_token);
//   saveRefreshToken(data.refresh_token);
//   whoAmIQuery.refetch().then(() => {
//     config.onSuccess();
//   });
//   config.onSuccess();
// };

.replaceAll(/[,']+/ig, "");// eliminar varios caraceteres de un string

// scroll hacia una vista....................
const myRef = useRef() as MutableRefObject<HTMLDivElement>;

const executeScroll = () => {
  myRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
};

<div ref={myRef}>
 <p>el componente</p>
</div>
//.........................................



const linkArray = [
        "https://www.homecenter.com.co/homecenter-co/category/cat10638/rines-y-llantas-para-carro/",
        "https://www.homecenter.com.co/homecenter-co/landing/cat10642/Baterias-para-Carros-y-Accesorios",
        "https://www.homecenter.com.co/homecenter-co/landing/cat10652/Articulos-y-Productos-de-Limpieza-para-Carros",
        "https://www.homecenter.com.co/homecenter-co/landing/cat10658/Seguridad-Vial",
        "https://www.homecenter.com.co/homecenter-co/landing/cat10640/Audio-y-Video-para-Carros",
        "https://www.homecenter.com.co/homecenter-co/category/cat10644/accesorios-de-exterior-para-carros/",
        "https://www.homecenter.com.co/homecenter-co/landing/cat10646/Accesorios-de-Interior-para-Carros",
        "https://www.homecenter.com.co/homecenter-co/landing/cat1590024/Taller-Mecanico"
]
