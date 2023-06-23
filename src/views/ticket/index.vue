<template>
  <div>
    <h1>酒店查询</h1>
    <form @submit.prevent="submitForm">
      <label>所在城市：</label>
      <input v-model="location" type="text" required>
      <label>酒店名称：</label>
      <input v-model="hotelname" type="text" required>
      <label>订购日期：</label>
      <input v-model="bookdate" type="date" required>
      <label>酒店类型：</label>
      <select v-model="hoteltype">
        <option value="economy">快捷酒店</option>
        <option value="business">商务酒店</option>
        <option value="vocation">度假酒店</option>
        <option value="apartment">公寓酒店</option>
      </select>
      <button type="submit">查询</button>
    </form>
    <br>
    <table id="hotelTable" border="1">
      <thead>
        <tr>
          <th>酒店名称</th>
          <th>酒店地址</th>
          <th>所在城市</th>
          <th>订购日期</th>
          <th>酒店类型</th>
          <th>价格</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(hotel, index) in hotels" :key="index">
          <td>{{ hotel.hotelname }}</td>
          <td>{{ hotel.address }}</td>
          <td>{{ hotel.location }}</td>
          <td>{{ hotel.bookdate }}</td>
          <td>{{ hotel.hoteltype }}</td>
          <td>{{ hotel.price }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      location: '',
      hotelname: '',
      bookdate: '',
      hoteltype: '',
      hotels: []
    }
  },
  methods: {
    async submitForm() {
      let response
      try {
        response = await fetch('http://127.0.0.1:8090/api/hotel/queryHotel', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            location: this.location,
            hotelname: this.hotelname,
            bookdate: this.bookdate,
            hoteltype: this.hoteltype
          })
        })
      } catch (error) {
        console.error('Fetch Error:', error)
      }

      if (response) {
        const data = await response.json()
        this.hotels = data.data
        console.log(this.hotels)
      }
    }
  }
}
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  background-color: #f7f7f7;
  margin: 0;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 24px;
  margin-top: 0;
}

.form-row {
  display: flex;
  margin-bottom: 10px;
}

.form-row label {
  flex-basis: 150px;
  flex-shrink: 0;
  padding: 5px 0;
  font-weight: bold;
}

.form-row input[type="text"],
.form-row input[type="date"] {
  flex-basis: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.form-row select {
  flex-basis: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.form-row .submit-btn {
  flex-basis: 100%;
  margin-top: 10px;
}

table {
  border-collapse: collapse;
  width: 80%;
  margin-top: 20px;
}

th,
td {
  text-align: left;
  padding: 8px;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
}

tr:hover {
  background-color: #f5f5f5;
}
</style>
