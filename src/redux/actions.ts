import {
  GET_CANCHAS,
  GET_RESERVA,
  DELETE_RESERVA,
  GET_TEAMS,
  GET_NOTIFICACIONES,
  GET_TEAMS_ID,
  GET_PLAYERS,
  GET_NOTIFICACIONES_MY_TEAM,
  GET_NOTICACIONES_EQUIPO,
  GET_RESPUESTA_EQUIPO,
  GET_TEAMS_ALLTEAMS,
  GET_ALL_RESERVA,
} from "./actionsNames";

// import axios from '../lib/axiosConfig'

import axios from "axios";

export async function postUsername(payload: User) {
  const response = await axios.post("http://localhost:3001/user", payload);
  console.log("PAYLOAD POSTUSERNAME", response);
  return response.data;
}

export async function postLogin({ mail, password }: any) {
  try {
    const response = await axios.post("http://localhost:3001/auth/local", {
      mail,
      password,
    });
    const user = response.data;
    return {
      type: "POST_LOGIN",
      payload: user,
    };
  } catch (error) {
    console.log("ERROR DEL POSTLOGIN", error);
  }
}
export async function putLoginGoogle(user: any) {
  try {
    const response = await axios.put(
      "http://localhost:3001/auth/googleFormLogin",
      user
    );
    const userGoogle = response.data;
    return {
      type: "PUT_LOGIN",
      payload: userGoogle,
    };
  } catch (error) {
    console.log("ERROR DEL PUTLOGINGOOGLE", error);
  }
}
export async function postLoginGoogle(user: any) {
  try {
    const response = await axios.post(
      "http://localhost:3001/auth/googleLogin",
      user
    );
    const userGoogle = response.data;
    return {
      type: "POST_LOGIN",
      payload: userGoogle,
    };
  } catch (error) {
    console.log("ERROR DEL POST-LOGIN-GOOGLE", error);
  }
}

export function getUser(id: any) {
  return async function (dispatch: any) {
    const token = window.sessionStorage.getItem("jwt") || "";
    let res = await axios.get("http://localhost:3001/user?id=" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return dispatch({ type: "POST_LOGIN", payload: res.data });
  };
}

export function getCanchasDisponible(payload: any) {
  return async function (dispatch: any) {
    const token = window.sessionStorage.getItem("jwt") || "";
    let res = await axios.get(
      "http://localhost:3001/fields/available/" + payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return dispatch({ type: GET_CANCHAS, payload: res.data });
  };
}

export function resetUser() {
  return { type: "RESET" };
}

export function deleteUser(id: any) {
  return async function () {
    try {
      const token = window.sessionStorage.getItem("jwt") || "";
      const res = await axios.delete(`http://localhost:3001/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Usuario eliminado");
      return res;
    } catch (err) {
      alert("Vuelve a intentar");
      console.log(err);
    }
  };
}

export function postReserva(payload: any) {
  return async function () {
    const token = window.sessionStorage.getItem("jwt") || "";
    const res = await axios.post("http://localhost:3001/timetable", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res;
  };
}

export function postTeam(payload: any) {
  return async function () {
    const token = window.sessionStorage.getItem("jwt") || "";
    const res = await axios.post("http://localhost:3001/team", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  };
}

export function putUser(id: any, payload: any) {
  return async function () {
    try {
      const token = window.sessionStorage.getItem("jwt") || "";
      const res = await axios.put(`http://localhost:3001/user/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Cambios realizados satisfactoriamente");
      return res;
    } catch (err) {
      alert("Vuelve a intentar por favor");
      console.log("put", err);
    }
  };
}

export function putTeam(id: any, payload: any) {
  return async function () {
    try {
      const token = window.sessionStorage.getItem("jwt") || "";
      const res = await axios.put(
        `http://localhost:3001/team/team/${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res;
    } catch (err) {
      console.log("Error equipo", err);
      alert("Algo salio mal");
    }
  };
}
export function putPlayerQualification(payload: any) {


  return async function () {
    try {
      const token = window.sessionStorage.getItem("jwt") || "";
      const res = await axios.put(
        `http://localhost:3001/player/qualification`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res;
    } catch (err) {
      console.log("Error put de player", err);
    }
  };
}
export function resetReserva() {
  return async function (dispatch: any) {
    return dispatch({ type: "RESET_RESERVA" });
  };
}

export function getReserva(id: any) {
  return async function (dispatch: any) {
    const token = window.sessionStorage.getItem("jwt") || "";
    let res = await axios.get(`http://localhost:3001/timetable/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return dispatch({ type: GET_RESERVA, payload: res.data });
  };
}

export function deleteReserva(id: any) {
  return async function (dispatch: any) {
    const token = window.sessionStorage.getItem("jwt") || "";
    let res = await axios.delete(`http://localhost:3001/timetable/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return dispatch({ type: DELETE_RESERVA });
  };
}

export function getTeams() {
  return async function (dispatch: any) {
    const token = window.sessionStorage.getItem("jwt") || "";
    let res = await axios.get("http://localhost:3001/team/available", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return dispatch({ type: GET_TEAMS, payload: res.data });
  };
}

export function getTeamsId(id: any) {
  return async function (dispatch: any) {
    const token = window.sessionStorage.getItem("jwt") || "";
    let res = await axios.get("http://localhost:3001/team?id=" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return dispatch({ type: GET_TEAMS_ID, payload: res.data });
  };
}
export function getTeamsDetailId(id: any) {
  return async function (dispatch: any) {
    try {
      const token = window.sessionStorage.getItem("jwt") || "";
      let res = await axios.get("http://localhost:3001/team/team/" + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return dispatch({ type: "GET_TEAM_DETAIL_ID", payload: res.data });
    } catch (err) {
      console.log(err);
    }
  };
}

export function resetTeam() {
  return async function (dispatch: any) {
    return dispatch({ type: "RESET_TEAM" });
  };
}
export function getPlayers() {
  return async function (dispatch: any) {
    const token = window.sessionStorage.getItem("jwt") || "";
    let res = await axios.get("http://localhost:3001/player", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return dispatch({ type: GET_PLAYERS, payload: res.data });
  };
}

export function orderByName(orden: any) {
  return async function (dispatch: any) {
    const token = window.sessionStorage.getItem("jwt") || "";
    let res = await axios.get(`http://localhost:3001/player?order=${orden}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return dispatch({ type: "GET_ORDER_BY_NAME", payload: res.data });
  };
}

export function orderByNameAvailable(orden: any) {
  return async function (dispatch: any) {
    const token = window.sessionStorage.getItem("jwt") || "";
    let res = await axios.get(
      `http://localhost:3001/player/available?order=${orden}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return dispatch({
      type: "GET_ORDER_BY_NAME_DISPONIBLE",
      payload: res.data,
    });
  };
}

export function getPlayersDisponibles(orden: any) {
  //PLAYERS NO BORRAR repetir
  return async function (dispatch: any) {
    const token = window.sessionStorage.getItem("jwt") || "";
    let res = await axios.get(
      `http://localhost:3001/player/available?order=${orden}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return dispatch({ type: "GET_PLAYERS_DISPONIBLES", payload: res.data });
  };
}
export function getSoloDisponibles() {
  return async function (dispatch: any) {
    const token = window.sessionStorage.getItem("jwt") || "";
    let res = await axios.get(`http://localhost:3001/player/available`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return dispatch({ type: "GET_SOLO_DISPONIBLES", payload: res.data });
  };
}
export function getOrderGender(orden: any) {
  return async function (dispatch: any) {
    const token = window.sessionStorage.getItem("jwt") || "";
    let res = await axios.get(`http://localhost:3001/player/${orden}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return dispatch({ type: "GET_PLAYERS_GENDER", payload: res.data });
  };
}
export function getOrderGenderAvailable(orden: any) {
  return async function (dispatch: any) {
    const token = window.sessionStorage.getItem("jwt") || "";
    let res = await axios.get(
      `http://localhost:3001/player/available?gender=${orden}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return dispatch({
      type: "GET_PLAYERS_GENDER_AVAILABLE",
      payload: res.data,
    });
  };
}

export function getOrderPunctuation(orden: any) {
  return async function (dispatch: any) {
    const token = window.sessionStorage.getItem("jwt") || "";
    let res = await axios.get(
      `http://localhost:3001/player/punctuation/${orden}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return dispatch({ type: "GET_PLAYERS_PUNCTUATION", payload: res.data });
  };
}
export function getOrderPunctuationAvailable(orden: any) {
  return async function (dispatch: any) {
    const token = window.sessionStorage.getItem("jwt") || "";
    let res = await axios.get(
      `http://localhost:3001/player/available?punctuation=${orden}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return dispatch({
      type: "GET_PLAYERS_PUNCTUATION_DISPONIBLE",
      payload: res.data,
    });
  };
}

export function getOrderPosition(orden: any) {
  return async function (dispatch: any) {
    const token = window.sessionStorage.getItem("jwt") || "";
    let res = await axios.get(
      `http://localhost:3001/player/position/${orden}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return dispatch({ type: "GET_PLAYERS_POSITION", payload: res.data });
  };
}
export function getOrderPositionAvailable(orden: any) {
  return async function (dispatch: any) {
    const token = window.sessionStorage.getItem("jwt") || "";
    let res = await axios.get(
      `http://localhost:3001/player/available?position=${orden}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return dispatch({
      type: "GET_PLAYERS_POSITION_AVAILABLE",
      payload: res.data,
    });
  };
}
export function searchByName(orden: any) {
  return async function (dispatch: any) {
    const token = window.sessionStorage.getItem("jwt") || "";
    let res = await axios.get(`http://localhost:3001/player/byname/${orden}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return dispatch({ type: "SEARCH_PLAYER", payload: res.data });
  };
}

export function addCarrito(payload: any) {
  return async function (dispatch: any) {
    return dispatch({ type: "ADD_CARRITO", payload });
  };
}
export function addCarritoDisponible(payload: any) {
  return async function (dispatch: any) {
    return dispatch({ type: "ADD_CARRITO_DISPONIBLE", payload });
  };
}

export function filterCarritoDisponible(payload: any) {
  return async function (dispatch: any) {
    return dispatch({ type: "FILTER_CARRITO_DISPONIBLE", payload });
  };
}
export function filterCarrito(payload: any) {
  return async function (dispatch: any) {
    return dispatch({ type: "FILTER_CARRITO", payload });
  };
}

export function putEditTeam(id: any, payload: any) {
  return async function () {
    try {
      const token = window.sessionStorage.getItem("jwt") || "";
      const res = await axios.put(
        `http://localhost:3001/team/team/${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return alert("Cambios realizados satisfactoriamente");
    } catch (err) {
      alert("Error, vuelve a intentar");
      console.log("put", err);
    }
  };
}

export function deleteTeam(id: any) {
  return async function () {
    try {
      const token = window.sessionStorage.getItem("jwt") || "";
      const res = await axios.delete(`http://localhost:3001/team/team/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return alert("Equipo eliminado");
    } catch (err) {
      console.log(err);
      return alert("Vuelve a intentar");
    }
  };
}
export function filterTeam(payload: any) {
  return {
    type: "FILTER_TEAM",
    payload,
  };
}

export function getNotificaciones(id: any) {
  return async function (dispatch: any) {
    const token = window.sessionStorage.getItem("jwt") || "";
    let res = await axios.get(`http://localhost:3001/notification/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return dispatch({ type: GET_NOTIFICACIONES, payload: res.data });
  };
}

export function getNotificacionesMisEquipos(id: any) {
  return async function (dispatch: any) {
    const token = window.sessionStorage.getItem("jwt") || "";
    let res = await axios.get(
      `http://localhost:3001/notification/myteam/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return dispatch({ type: GET_NOTIFICACIONES_MY_TEAM, payload: res.data });
  };
}
export function putNotification(payload: any) {
  return async function () {
    try {
      const token = window.sessionStorage.getItem("jwt") || "";
      const res = await axios.put(
        "http://localhost:3001/notification",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res;
    } catch (err) {
      console.log("put", err);
    }
  };
}

export function postNotification(payload: any) {
  return async function () {
    try {
      const token = window.sessionStorage.getItem("jwt") || "";
      const res = await axios.post(
        `http://localhost:3001/notification`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Notificacion enviada");
      return res;
    } catch (err) {
      alert("Fallo envio de notificacion");
      console.log("post", err);
    }
  };
}

export function putCalificarTeam(payload: any) {
  return async function () {
    try {
      const token = window.sessionStorage.getItem("jwt") || "";
      const res = await axios.put(
        `http://localhost:3001/team/qualification`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return alert("Calificaste con exito");
    } catch (err) {
      console.log("Error equipo", err);
      alert("Algo salio mal invitando");
    }
  };
}

export function selectDay(payload: any) {
  return {
    type: "SELECT_DAY",
    payload,
  };
}
export function selectHour(payload: any) {
  return {
    type: "SELECT_HOUR",
    payload,
  };
}
export function resetCarrito() {
  return {
    type: "RESET_CARRITO",
  };
}
export function getNotificacionesJugadorUnir(id: any) {
  return async function (dispatch: any) {
    const token = window.sessionStorage.getItem("jwt") || "";
    let res = await axios.get(
      `http://localhost:3001/notification/joinTeam/myteam/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return dispatch({ type: GET_NOTICACIONES_EQUIPO, payload: res.data });
  };
}

export function getNotificacionesRespuestaJugadorUnir(id: any) {
  return async function (dispatch: any) {
    const token = window.sessionStorage.getItem("jwt") || "";
    let res = await axios.get(
      `http://localhost:3001/notification/joinTeam/teamrespond/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return dispatch({ type: GET_RESPUESTA_EQUIPO, payload: res.data });
  };
}
export function putNotificationTeams(payload: any) {
  return async function () {
    try {
      const token = window.sessionStorage.getItem("jwt") || "";
      const res = await axios.put(
        "http://localhost:3001/notification/joinTeam",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res;
    } catch (err) {
      console.log("put", err);
    }
  };
}
export function getAllTeams() {
  return async function (dispatch: any) {
    const token = window.sessionStorage.getItem("jwt") || "";
    let res = await axios.get("http://localhost:3001/team/allTeams", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return dispatch({ type: GET_TEAMS_ALLTEAMS, payload: res.data });
  };
}

export function getAllReserva(id: any) {
  return async function (dispatch: any) {
    const token = window.sessionStorage.getItem("jwt") || "";
    let res = await axios.get(`http://localhost:3001/timetable/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return dispatch({ type: GET_ALL_RESERVA, payload: res.data });
  };
}

export function postNotificationTeam(payload: any) {
  return async function () {
    try {
      const token = window.sessionStorage.getItem("jwt") || "";
      const res = await axios.post(
        `http://localhost:3001/notification/joinTeam`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Notificacion enviada");
      return res;
    } catch (err) {
      alert("Fallo envio de notificacion");
      console.log("post", err);
    }
  };
}

export function filterPlayerTeam(payload: any) {
  return async function (dispatch: any) {
    return dispatch({ type: "FILTER_PLAYER_TEAM", payload });
  };
}
// player/available?search=string_a_buscar (filtra sólo los nombres que cohinciden)

export function searchByNameAvailable(orden: any) {
  return async function (dispatch: any) {
    const token = window.sessionStorage.getItem("jwt") || "";
    let res = await axios.get(
      `http://localhost:3001/player/available?search=${orden}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return dispatch({ type: "SEARCH_PLAYER_AVAILABLE", payload: res.data });
  };
}
