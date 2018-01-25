<template> 
  <div>
    <div class="col-10 offset-1">
      <h3>Para participar en esta tabla</h3>
      <ul>
        <li>Rellenar el formulario en: <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLScUuImEQB3HAYjOVEN_n3iOhlIrq41XxRpZeMUfN2RiwctElA/viewform">Google</a></li>
        <li>Esperar hasta que uno de los contribuyentes te agregue manualmente.</li>
        <li>Después, todos los resultados se actualizarán cada 20 minutos.</li>
      </ul>
      <table class="table table-bordered table-hover" border="1">
        <thead>
            <td style="font-weight: bold; text-align: center">USUARIO</td>
            <td style="font-weight: bold; text-align: center" v-for="col of cols">
              <a target="_blank" :href="col.url">{{col.code}}</a>
            </td>
        </thead>
        <tbody>
          <tr v-for="(row, i) in rows">
            <td style="font-weight: bold; text-align: center">{{row}}</td>
            <td style="text-align: center" v-for="(col, j) in cols" :class="matrix[i][j] ? 'bg-success':'bg-light'">
              {{ matrix[i][j] ? 'AC': ' - ' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data: function(){ return {}; }
}
</script>
