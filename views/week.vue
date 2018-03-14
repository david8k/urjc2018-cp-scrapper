<template> 
  <div>
    <div class="col-10 offset-1">
      <a class="btn btn-warning float-right" href="/">Volver</a>
      <ul>
        <li><a class="iimportant" href="https://forms.office.com/Pages/ResponsePage.aspx?id=6sSEXw03nkuDDHVvi_G1H9OCGnqjL8xMqYdnNlEm3GpUQUZVUEZVTUVIVk82NUMyRFdPNjVYVkZWWC4u"><strong>¡IMPORTANTE!</strong> Formulario para inscribirse al Ada-Byron (Inscripciones abiertas hasta después de Semana Santa)</a></li>
      </ul>
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
            <td style="text-align: center" v-for="(col, j) in cols" :class="matrix[i][j] === 0 ? 'bg-success': (matrix[i][j] === 1 ? 'bg-warning': 'bg-light')">
              {{ matrix[i][j] === 0 ? 'AC': (matrix[i][j] === 1 ? 'TRIED' : ' - ') }}
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
