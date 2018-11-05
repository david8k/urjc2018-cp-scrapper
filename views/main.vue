<template> 
  <div>
    <div class="col-10 offset-1">
      <div class="row">
      <div class="col-5"><h3>Tabla {{year}}</h3></div>
      <div class="col-5">
        <a class="btn btn-warning float-right" href="/">Volver</a>
      </div>
      <table class="table table-bordered table-hover" border="1">
        <thead>
            <td style="font-weight: bold; text-align: center">USUARIO</td>
            <td style="font-weight: bold; text-align: center" v-for="col of cols">
              <a target="_blank" :href="'/'+year+'/'+col+'/'">{{col}}</a>
            </td>
            <td style="font-weight: bold; text-align: center">PROGRESO</td>
        </thead>
        <tbody>
          <tr v-for="(row, i) in rows">
            <td style="font-weight: bold; text-align: center">{{row}}</td>
            <td style="text-align: center" v-for="(col, j) in cols">
              {{ matrix[i][j].solved +' / '+matrix[i][j].total }}
            </td>
            <td width="10%">
              <div class="progress">
                <div class="progress-bar bg-success" role="progressbar" :style="'width:'+(acs[i].current/acs[i].total*100.0)+'%'" :aria-valuenow="acs[i].current/acs[i].total*100.0" aria-valuemin="0"></div>
                <div class="progress-bar bg-warning" role="progressbar" :style="'width:'+(noks[i].current/noks[i].total*100.0)+'%'" :aria-valuenow="noks[i].current/noks[i].total*100.0" aria-valuemin="0"></div>
              </div>
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
