<template> 
  <div>
    <div class="col-10 offset-1">
      <a class="btn btn-warning float-right" href="/">Volver</a>
      <table class="table table-bordered table-hover" border="1">
        <thead>
            <td style="font-weight: bold; text-align: center">USUARIO</td>
            <td style="font-weight: bold; text-align: center" v-for="col of cols">
              <a target="_blank" :href="col.url">{{col.code}}</a><br>
              <strong title="Dificultad del problema">{{col.difficulty}}</strong>
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
