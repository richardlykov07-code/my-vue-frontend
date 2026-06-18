<template>
  <div style="padding: 1rem; max-width: 1200px; margin: 0 auto;">
    <h1 style="text-align: center; margin-bottom: 2rem; color: #333;">Рейтинги</h1>

    <CreateRatingDialog />

    <ConfirmDialog></ConfirmDialog>

    <div v-if="this.$store.state.dataPreLoading" style="text-align: center; padding: 2rem;">
      <ProgressSpinner strokeWidth="4" style="width:50px; height:50px;" />
    </div>

    <div v-else>
      <DataView :value="ratings" layout="grid">
        <template #grid="slotProps">
          <div style="display: flex; flex-wrap: wrap; gap: 1.5rem; justify-content: center; padding: 1rem 0;">
            
            <div v-for="(item, index) in slotProps.items" :key="index" style="width: 250px;">
              <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); display: flex; flex-direction: column; height: 100%; overflow: hidden;">
                
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: #f8fafc; border-bottom: 1px solid #e2e8f0;">
                  <span style="font-weight: bold; font-size: 1.05rem; color: #1e293b;">{{ item.name }}</span>
                  <button @click="confirmDelete(item)" style="background: transparent; border: none; color: #ef4444; cursor: pointer; font-size: 1.1rem; padding: 4px; display: flex; align-items: center; justify-content: center;" title="Удалить">
                    <i class="pi pi-trash"></i>
                  </button>
                </div>

                <div style="text-align: center; padding: 1rem; background: #ffffff; height: 150px; display: flex; align-items: center; justify-content: center;">
                  <img :alt="item.name" :src="getAvatarPath(item)" style="max-width: 110px; max-height: 110px; object-fit: contain;" />
                </div>

                <div style="padding: 1rem; background: #f8fafc; border-top: 1px solid #e2e8f0; text-align: center; margin-top: auto;">
                  <div style="font-size: 0.85rem; color: #64748b; margin-bottom: 0.5rem; min-height: 34px; display: flex; align-items: center; justify-content: center; line-height: 1.3;">
                    {{ item.description || 'Описание отсутствует' }}
                  </div>
                  <div style="font-weight: bold; font-size: 0.95rem; color: #334155;">
                    Возраст: {{ getAge(item) }}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </template>
      </DataView>

      <div style="margin-top: 2rem; display: flex; justify-content: center;">
        <Paginator :rows="rows" :rowsPerPageOptions="[2, 5, 10, 50]" :totalRecords="total" @page="onPage($event)" />
      </div>
    </div>
  </div>
</template>

<script>
import Paginator from 'primevue/paginator';
import DataView from 'primevue/dataview';
import ProgressSpinner from 'primevue/progressspinner';
import ConfirmDialog from 'primevue/confirmdialog';
import CreateRatingDialog from './CreateRatingDialog.vue';

export default {
  name: "RatingComponent",
  components: { Paginator, DataView, ProgressSpinner, ConfirmDialog, CreateRatingDialog },
  data() { return { rows: 5, layout: 'grid' }; },
  methods: {
    onPage(event) {
      this.$store.state.pager.perPage = event.rows;
      this.$store.commit("setPage", event.page + 1);
      this.$store.dispatch('getRating');
    },
    confirmDelete(item) {
      this.$confirm.require({
        message: `Вы действительно хотите удалить пользователя ${item.name}?`,
        header: 'Подтверждение удаления',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Да, удалить',
        rejectLabel: 'Отмена',
        accept: () => { this.$store.dispatch('deleteRating', item.id); }
      });
    },
    getAvatarPath(item) {
      if (!item || !item.gender) return new URL('../assets/boy.png', import.meta.url).href;
      const genderStr = String(item.gender).toLowerCase().trim();
      if (genderStr === 'male' || genderStr === '1') return new URL('../assets/boy.png', import.meta.url).href;
      return "https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png";
    },
    getAge(rating) {
      if (!rating.birthday) return 'Не указан';
      const now = new Date();
      const birthday = new Date(rating.birthday);
      let year = now.getFullYear() - birthday.getFullYear();
      let month = now.getMonth() - birthday.getMonth();
      if (month < 0 || (month === 0 && now.getDate() < birthday.getDate())) { year--; month = 12 + month; }
      let year_text = year + ' лет';
      if (year % 10 === 1 && year % 100 !== 11) year_text = year + ' год';
      if ([2, 3, 4].includes(year % 10) && ![12, 13, 14].includes(year % 100)) year_text = year + ' года';
      if (year === 0) year_text = '';
      const month_text = month + ' мес.';
      return (year_text + ' ' + month_text).trim();
    }
  },
  computed: {
    ratings() { return this.$store.state.rating; },
    total() { return this.$store.state.pager.total; }
  },
  mounted() {
    if (this.$store.state.loggedIn) { this.$store.dispatch('getRating'); } 
    else { this.$router.push('/'); }
  }
};
</script>

<style>
/* ЖЕСТКИЙ ФИКС ДЛЯ ПРАВИЛЬНОГО ОТОБРАЖЕНИЯ ОКН В PRIMEVUE v4 БЕЗ ТЕМЫ */
.p-dialog-mask, .p-confirmdialog-mask {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100vw !important;
  height: 100vh !important;
  background-color: rgba(0, 0, 0, 0.55) !important; /* Серый полупрозрачный фон сзади */
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  z-index: 9999 !important;
}

.p-dialog, .p-confirmdialog {
  background: #ffffff !important; /* Окно строго белое */
  border-radius: 8px !important;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2) !important;
  border: 1px solid #e2e8f0 !important;
  font-family: inherit;
  overflow: hidden;
}

.p-dialog-header, .p-confirmdialog-header {
  background: #f8fafc !important;
  padding: 1rem 1.5rem !important;
  border-bottom: 1px solid #e2e8f0 !important;
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
}

.p-dialog-title, .p-confirmdialog-title {
  font-weight: bold !important;
  font-size: 1.1rem !important;
  color: #1e293b !important;
}

.p-dialog-header-actions button {
  background: transparent !important;
  border: none !important;
  cursor: pointer !important;
}

.p-dialog-content, .p-confirmdialog-content {
  background: #ffffff !important;
  padding: 1.5rem !important;
  color: #334155 !important;
}

.p-dialog-footer, .p-confirmdialog-footer {
  background: #f8fafc !important;
  padding: 1rem 1.5rem !important;
  border-top: 1px solid #e2e8f0 !important;
  display: flex !important;
  justify-content: flex-end !important;
  gap: 0.5rem !important;
}

/* Кнопки диалога удаления */
.p-confirmdialog-reject {
  background: transparent !important;
  border: 1px solid #cbd5e1 !important;
  padding: 0.5rem 1rem !important;
  border-radius: 4px !important;
  cursor: pointer !important;
}
.p-confirmdialog-accept {
  background: #ef4444 !important;
  color: white !important;
  border: none !important;
  padding: 0.5rem 1rem !important;
  border-radius: 4px !important;
  cursor: pointer !important;
}
</style>
