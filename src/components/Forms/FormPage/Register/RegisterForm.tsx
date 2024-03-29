import React, { useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./RegisterForm.module.scss";
import { postUsername } from "../../../../redux/actions";
import { useHistory } from "react-router";

export default function RegisterForm() {
  const history = useHistory();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm<User>();
  const password = useRef({});
  password.current = watch("password", "");
  const onSubmit: SubmitHandler<User> = async (data) => {
    const usuario = await postUsername(data);
    if (
      usuario === "El email ya existe" ||
      usuario === "El dni ya existe" ||
      usuario === "El nombre de usuario ya existe"
    ) {
      alert(usuario);
      return "";
    }
    alert("Usuario Creado")
    reset()
    history.push("/");
  };

  return (
    <div className={styles.formBgImg}>
      <h2>Registrate</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formDiv}>
          <input
            autoComplete="off"
            className={styles.formInput}
            placeholder="Escribe tu nombre"
            {...register("name", { required: true })}
          />
          <label className={styles.formLabel}>Nombre</label>
          {errors.name?.type === "required" && "name is required"}
        </div>
        <div className={styles.formDiv}>
          <input
            autoComplete="off"
            className={styles.formInput}
            placeholder="Escribe tu nombre de usuario"
            {...register("userName", { required: true })}
          />
          <label className={styles.formLabel}>Nombre de usuario</label>
          {errors.userName?.type === "required" && "userName is required"}
        </div>
        <div className={styles.formDiv}>
          <input
            className={styles.formInput}
            placeholder="Ingresa tu correo electronico"
            type="email"
            {...register("mail", {
              required: true,
              pattern:
                // eslint-disable-next-line no-useless-escape
                /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
            })}
          />
          <label className={styles.formLabel}>Correo electronico</label>
          {errors.mail?.type === "required" && "mail is required"}
        </div>
        <div className={styles.formDiv}>
          <input
            className={styles.formInput}
            type="password"
            placeholder="Ingresa una contraseña"
            {...register("password", {
              required: true,
              minLength: {
                value: 8,
                message: "Password must have at least 8 characters",
              },
            })}
          />
          <label className={styles.formLabel}>Contraseña</label>
          {errors.password && errors.password.message}
        </div>
        <div className={styles.formDiv}>
          <input
            className={styles.formInput}
            type="password"
            {...register("password_repeat", {
              validate: (value: {}) =>
                value === password.current || "The passwords do not match",
            })}
          />
          <label className={styles.formLabel}>Confirmar contraseña</label>
          {errors.password_repeat && errors.password_repeat.message}
        </div>
        <div className={styles.formDiv}>
          <input
            className={styles.formInput}
            type="date"
            {...register("birthday", { required: true })}
          />
          <label className={styles.formLabel}>Fecha de nacimiento</label>
          {errors.birthday?.type === "required" && "Birthday is required"}
        </div>
        <div className={styles.formDiv}>
          <input
            className={styles.formInput}
            type="number"
            placeholder="Ingresa tu documento de identificacion"
            {...register("dni", { valueAsNumber: true, required: true })}
          />
          <label className={styles.formLabel}>
            Documento de identificacion
          </label>
          {errors.dni?.type === "required" && "dni is required"}
        </div>
        <div className={styles.formDiv}>
          <input
            className={styles.formInput}
            placeholder="Ingresa tu numero telefonico"
            type="tel"
            {...register("cellphone", { required: true, valueAsNumber: true })}
          />
          <label className={styles.formLabel}>Numero de telefono</label>
          {errors.cellphone?.type === "required" && "Cellphone is required"}
        </div>
        <div className={styles.formDiv}>
          <label className={styles.formLabel}>Posicion</label>
          <select className="selectForm" {...register("player.position")}>
            <option selected={true} disabled value="Default">
              Escoge una posicion
            </option>
            <option value="GOALKEEPER">ARQUERO</option>
            <option value="DEFENDER">DEFENSOR</option>
            <option value="MIDFIELDER">MEDIOCAMPISTA</option>
            <option value="ATTACKER">ATACANTE</option>
          </select>
        </div>
        <div className={styles.formDiv}>
          <label className={styles.formLabel}>Genero</label>
          <select className="selectForm" {...register("gender")}>
            <option selected={true} disabled value="Default">
              Escoge un genero
            </option>
            <option value="FEMALE">FEMENINO</option>
            <option value="MALE">MASCULINO</option>
            <option value="UNDEFINED">OTRO</option>
          </select>
        </div>
        <div className={styles.btncontainer}>
          <input className={styles.button} type="submit" />
        </div>
      </form>
    </div>
  );
}
