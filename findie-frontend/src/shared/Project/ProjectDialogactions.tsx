import { FC, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { UseQueryResult } from 'react-query'
import ClpField from '../../assets/UIkit/Forms/ClpField'
import InputField from '../../assets/UIkit/Forms/InputField'
import { TRequestAction } from '../../customHooks/useOpenDialog'
import { IProject, IStack } from '../../models/IProject'

type TDialogActions = {
  recuestAction?: TRequestAction
  project?: UseQueryResult<IProject, unknown>
  areYouSure?: boolean
  stack?: IStack
}

interface IPaymentActions extends TDialogActions {
  dialog: any
  form: UseFormReturn<any>
  paymentStatus: () => any
}

export const AprroveOrDeleteProject: FC<TDialogActions> = (props) => {
  return (
    <span className='subtitle4-medium'>
      ¿Estás seguro que deseas {props?.recuestAction === 'approve' ? 'aprobar' : 'eliminar'} el proyecto: "
      {props?.project?.data?.title}"?
    </span>
  )
}

export const SuspendProject: FC<TDialogActions> = (props) => {
  return (
    <>
      {props?.areYouSure ? (
        <p className='body1-medium'>¿Estas seguro que deseas cancelar el projecto?</p>
      ) : (
        <>
          <p className='body1-medium'>Para cancelar el proyecto, debes seguir el siguiente procedimiento:</p>
          <p className='body2-medium mt-2'>1. En la sección Proyecto: Registrar el nuevo presupuesto del proyecto.</p>
          <p className='body2-medium'>2. En la sección Freelancers: Registrar los nuevos montos a pagar a cada freelancer.</p>
          <p className='body2-medium'>
            3. En la sección Calculadora: Ejecuta la calculadora, para que los nuevos costos se carguen en el proyecto.
          </p>
          <p className='body2-medium'>
            4. En la sección Historial de pagos: Asigna los pagos restantes a todos los freelancer para quedar sin deuda.
          </p>
        </>
      )}
    </>
  )
}

export const FinishProject: FC<TDialogActions> = (props) => {
  return (
    <>
      {props?.areYouSure ? (
        <p className='body1-medium'>¿Estas seguro que deseas dar el proyecto como terminado?</p>
      ) : (
        <>
          <p className='body1-medium'>Para terminar el proyecto, debes seguir el siguiente procedimiento:</p>
          <p className='body2-medium'>
            1. En la sección Historial de pagos: Asigna los pagos restantes a todos los freelancer para quedar sin deuda.
          </p>
        </>
      )}
    </>
  )
}

export const AddTicketToStack: FC = () => {
  return (
    <p className='body1-medium mb-4'>
      ¿Estás seguro de usar un ticket para este stack?
      <span className='text-red'> No podrás remover el ticket en el futuro.</span>
    </p>
  )
}

export const SuspendFreelancerStack: FC<TDialogActions> = (props) => {
  return (
    <>
      {props?.areYouSure ? (
        <p className='body1-medium'>
          ¿Estas seguro que deseas retirar a {props.stack?.freelancer?.name} del proyecto? No podrás revertir esta acción.
        </p>
      ) : (
        <>
          <p className='body1-medium'>
            Para remover a {props.stack?.freelancer?.name} del proyecto, debes seguir el siguiente procedimiento:
          </p>
          <p className='body2-medium mt-2'>
            1. En la sección freelancers, debes asignar el monto final que va a recibir {props.stack?.freelancer?.name}.
          </p>
          <p className='body2-medium'>
            2. En la sección historial de pagos, debes registrar todos los pagos restantes de {props.stack?.freelancer?.name}.
          </p>
          <p className='body2-medium'>
            3. Una vez realizados los pasos anteriores, procede a retirar a {props.stack?.freelancer?.name}.
          </p>
        </>
      )}
    </>
  )
}

export const PaymentsActions: FC<IPaymentActions> = (props) => {
  return (
    <div>
      {props.recuestAction === 'post' && <span className='subtitle4-medium'>Agregar pago </span>}
      {props.recuestAction === 'edit' && <span className='subtitle4-medium'>Editar "{props.dialog?.data?.title}"</span>}
      {props.recuestAction === 'delete' && (
        <span className='subtitle4-medium'>Estás seguro que deseas eliminar el pago: "{props.dialog?.data?.title}"</span>
      )}
      {props.recuestAction !== 'delete' && (
        <>
          <InputField
            name='title'
            label='Titulo'
            className='w-full mt-4'
            inputProps={{ className: 'w-full', placeholder: 'Razon del pago' }}
            options={{ required: 'Este campo es requerido' }}
            form={props.form}
          />
          <ClpField
            name='amount'
            label='Monto'
            className='w-full mt-4'
            inputProps={{ className: 'w-full', placeholder: 'Ingresa un monto' }}
            options={{
              required: 'Este campo es requerido',
              validate: () => {
                const debs = props.paymentStatus().debs
                const debsWhenEdit = props.dialog?.data?.amount + debs
                if (props.recuestAction === 'post' && +props.form.watch('amount') > debs) {
                  return 'El monto supera el restante por pagar'
                }
                if (props.recuestAction === 'edit' && +props.form.watch('amount') > debsWhenEdit) {
                  return 'El monto supera el restante por pagar'
                }
              },
            }}
            form={props.form}
          />
          <InputField
            name='createdAt'
            label='Fecha'
            className='w-full mt-4'
            inputProps={{ className: 'w-full', type: 'date' }}
            options={{ required: 'Este campo es requerido' }}
            form={props.form}
          />
        </>
      )}
    </div>
  )
}
