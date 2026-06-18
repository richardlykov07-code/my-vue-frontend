<template>
  <div style="text-align: center; margin-bottom: 2rem;">
    <button @click="visible = true" style="background: #22c55e; color: white; border: none; padding: 0.75rem 1.5rem; font-size: 1rem; font-weight: bold; border-radius: 8px; cursor: pointer; display: inline-flex; align-items: center; gap: 0.5rem; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
      <i class="pi pi-plus"></i> Добавить новую запись
    </button>
  </div>

  <Dialog v-model:visible="visible" modal header="Создание новой карточки" :style="{ width: '450px' }">
    <div style="display: flex; flex-direction: column; gap: 1.2rem; padding: 1rem 0;">
      
      <div style="display: flex; flex-direction: column; gap: 0.3rem;">
        <label for="username" style="font-weight: bold; color: #444;">Имя пользователя</label>
        <InputText id="username" v-model="name" placeholder="Введите имя" style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;" />
      </div>

      <div style="display: flex; flex-direction: column; gap: 0.3rem;">
        <label for="description" style="font-weight: bold; color: #444;">Описание</label>
        <Textarea id="description" v-model="description" rows="3" placeholder="Краткое описание" style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; resize: vertical;" />
      </div>

      <div style="display: flex; flex-direction: column; gap: 0.3rem;">
        <label for="birthday" style="font-weight: bold; color: #444;">Дата рождения</label>
        <input type="date" id="birthday" v-model="birthday" style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; font-family: inherit;" />
      </div>

      <div style="display: flex; flex-direction: column; gap: 0.3rem;">
        <label style="font-weight: bold; color: #444;">Пол</label>
        <div style="display: flex; gap: 2rem; margin-top: 0.2rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <RadioButton v-model="gender" inputId="genderM" name="gender" value="male" />
            <label for="genderM">Мужской</label>
          </div>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <RadioButton v-model="gender" inputId="genderF" name="gender" value="female" />
            <label for="genderF">Женский</label>
          </div>
        </div>
      </div>

    </div>

    <template #footer>
      <div style="display: flex; justify-content: flex-end; gap: 0.5rem; padding-top: 1rem; border-top: 1px solid #eee;">
        <Button label="Отмена" class="p-button-text p-button-secondary" @click="visible = false" style="padding: 0.5rem 1rem;" />
        <Button label="Сохранить" class="p-button-primary" @click="create" :disabled="!name || !birthday || !gender" style="padding: 0.5rem 1rem; background: #3b82f6; color: white; border: none; border-radius: 4px;" />
      </div>
    </template>
  </Dialog>
</template>

<script>
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import RadioButton from 'primevue/radiobutton';

export default {
  name: "CreateRatingDialog",
  components: { Button, Dialog, InputText, Textarea, RadioButton },
  data() {
    return { name: "", description: "", birthday: "", gender: "", visible: false };
  },
  methods: {
    create() {
      this.$store.dispatch('createRating', {
        name: this.name,
        description: this.description,
        birthday: this.birthday,
        gender: this.gender
      });
      this.name = ""; this.description = ""; this.birthday = ""; this.gender = "";
      this.visible = false;
    }
  }
}
</script>