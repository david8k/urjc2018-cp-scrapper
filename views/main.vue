<template> 
  <div>
    <div class="col-10 offset-1">
      <h3>Para participar en esta tabla</h3>
      <ul>
        <li>Rellenar el formulario en: <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLScUuImEQB3HAYjOVEN_n3iOhlIrq41XxRpZeMUfN2RiwctElA/viewform">Google</a></li>
        <li>Esperar hasta que uno de los contribuyentes te agregue manualmente.</li>
        <li>Después, todos los resultados se actualizarán cada 20 minutos.</li>
        <li>Próxima actualización en <span class="text-danger font-weight-bold" id="next-update"></span></li>
      </ul>
      <table class="table table-bordered table-hover" border="1">
        <thead>
            <td style="font-weight: bold; text-align: center">USUARIO</td>
            <td style="font-weight: bold; text-align: center" v-for="col of cols">
              <a target="_blank" :href="'/'+col+'/'">{{col}}</a>
            </td>
            <td style="font-weight: bold; text-align: center">PROGRESO</td>
        </thead>
        <tbody>
          <tr v-for="(row, i) in rows">
            <td style="font-weight: bold; text-align: center">{{row}}</td>
            <td style="text-align: center" v-for="(col, j) in cols">
              {{ matrix[i][j].current +' / '+matrix[i][j].total }}
            </td>
            <td width="10%">
              <div class="progress">
                <div class="progress-bar bg-warning" role="progressbar" :style="'width:'+(sums[i].current/sums[i].total*100.0)+'%'" :aria-valuenow="sums[i].current/sums[i].total*100.0" aria-valuemin="0"></div>
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
  data: function(){ return {}; },
  created: function(){
    setInterval(function(){
      const this_date = new Date();
      const hours = this_date.getHours();
      const minutes = this_date.getMinutes();
      const seconds = this_date.getSeconds();
      const now_date = new Date();
      const target_date = now_date.setMinutes(parseInt(minutes/20)*20+20, 0, 0);
      let next_hours = parseInt((target_date - this_date) / 1000);
      let next_seconds = parseInt(next_hours) % 60;
      next_hours /= 60;
      let next_minutes = parseInt(next_hours) % 60;
      next_hours /= 60;
      next_hours = parseInt(next_hours);
      document.querySelector('#next-update').innerText = ('00'+next_hours.toString()).slice(-2)+':'+
        ('00'+next_minutes.toString()).slice(-2)+':'+
        ('00'+next_seconds.toString()).slice(-2);
      if(next_hours <= 0 && next_minutes <= 0 && next_seconds <= 0) document.location.reload();
    }, 1000);
  }
}
</script>
