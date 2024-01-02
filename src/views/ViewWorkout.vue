<template>
  <div class="max-w-screen-sm mx-auto px-4 py-10">
    <!-- app message -->
    <div
      v-if="statusMessage || errorMessage"
      class="mb-10 p-4 rounded-md shadow-md bg-light-grey"
    >
      <p class="text-at-light-green">
        {{ statusMessage }}
      </p>
      <p class="text-red-500">
        {{ errorMessage }}
      </p>
    </div>

    <!-- data -->
    <div v-if="dataLoaded">
      <!-- general workout information -->
      <div
        class="flex flex-col items-center p-8 rounded-md shadow-md bg-light-grey relative"
      >
        <!-- edit / delete icons -->
        <div v-if="user" class="absolute flex left-2 top-2 gap-x-2">
          <div
            class="h-7 w-7 rounded-full flex justify-center items-center cursor-pointer bg-at-light-green shadow-lg"
            @click="editMode"
          >
            <img
              src="@/assets/images/pencil-light.png"
              alt="pencil icon"
              class="h-3.5 w-auto"
            />
          </div>
          <div
            class="h-7 w-7 rounded-full flex justify-center items-center cursor-pointer bg-at-light-green shadow-lg"
            @click="deleteWorkout"
          >
            <img
              src="@/assets/images/trash-light.png"
              alt="trash icon"
              class="h-3.5 w-auto"
            />
          </div>
        </div>

        <!-- cardio icon -->
        <img
          src="@/assets/images/running-light-green.png"
          alt="cardio icon"
          class="h-24 w-auto"
          v-if="data.workoutType === 'cardio'"
        />
        <!-- strength icon -->
        <img
          src="@/assets/images/dumbbell-light-green.png"
          alt="strength icon"
          class="h-24 w-auto"
          v-else
        />

        <!-- workout type -->
        <span
          class="mt-6 py-1.5 px-5 text-xs text-white bg-at-light-green rounded-lg shadow-md"
          >{{ data.workoutType }}</span
        >

        <!-- title -->
        <div class="w-full mt-6">
          <input
            type="text"
            class="p-2 w-full text-gray-500 focus:outline-none"
            v-if="edit"
            v-model="data.workoutName"
          />
          <h1 v-else class="text-at-light-green text-2xl text-center">
            {{ data.workoutName }}
          </h1>
        </div>
      </div>

      <!-- exercises -->
      <div
        class="mt-10 p-8 rounded-md flex flex-col items-center bg-light-grey shadow-md"
      >
        <!-- strength training -->
        <div
          v-if="data.workoutType === 'strength'"
          class="flex flex-col gap-y-4 w-full"
        >
          <!-- v for loop -->
          <div
            class="flex flex-col gap-x-6 gap-y-2 relative sm:flex-row"
            v-for="(item, index) in data.exercises"
            :key="index"
          >
            <!-- exercise name -->
            <div class="flex flex-2 flex-col md:w-1/3">
              <label
                for="exercise-name"
                class="mb-1 text-sm text-at-light-green"
              >
                Exercise
              </label>
              <input
                type="text"
                id="exercise-name"
                v-if="edit"
                class="p-2 w-full text-gray-500 focus:outline-none"
                v-model="item.exercise"
              />
              <p v-else>{{ item.exercise }}</p>
            </div>

            <!-- sets -->
            <div class="flex flex-1 flex-col">
              <label for="sets" class="mb-1 text-sm text-at-light-green">
                Sets
              </label>
              <input
                type="text"
                id="sets"
                v-if="edit"
                class="p-2 w-full text-gray-500 focus:outline-none"
                v-model="item.sets"
              />
              <p v-else>{{ item.sets }}</p>
            </div>

            <!-- reps -->
            <div class="flex flex-1 flex-col">
              <label for="reps" class="mb-1 text-sm text-at-light-green">
                Reps
              </label>
              <input
                type="text"
                id="reps"
                v-if="edit"
                class="p-2 w-full text-gray-500 focus:outline-none"
                v-model="item.reps"
              />
              <p v-else>{{ item.reps }}</p>
            </div>

            <!-- weight -->
            <div class="flex flex-1 flex-col">
              <label for="weight" class="mb-1 text-sm text-at-light-green">
                Weight
              </label>
              <input
                type="text"
                id="weight"
                v-if="edit"
                class="p-2 w-full text-gray-500 focus:outline-none"
                v-model="item.weight"
              />
              <p v-else>{{ item.weight }}</p>
            </div>

            <!-- delete icon -->
            <img
              v-if="edit"
              @click="deleteExercise(item.id)"
              src="@/assets/images/trash-light-green.png"
              alt="trash icon"
              class="absolute h-4 w-auto -left-5 cursor-pointer"
            />
          </div>

          <button
            v-if="edit"
            @click="addExercise"
            type="button"
            class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-green duration-200 border-solid border-2 border-transparent hover:border-at-light-green hover:bg-white hover:text-at-light-green"
          >
            Add Exercise
          </button>
        </div>

        <!-- cardio training -->
        <div v-else class="flex flex-col gap-y-4 w-full">
          <!-- v for loop -->
          <div
            class="flex flex-col gap-x-6 gap-y-2 relative sm:flex-row"
            v-for="(item, index) in data.exercises"
            :key="index"
          >
            <!-- cardio type -->
            <div class="flex flex-2 flex-col md:w-1/3">
              <label for="cardioType" class="mb-1 text-sm text-at-light-green">
                Type
              </label>
              <select
                type="text"
                id="cardioType"
                v-if="edit"
                class="p-2 w-full text-gray-500 focus:outline-none"
                v-model="item.cardioType"
              >
                <option value="#">Select Type</option>
                <option value="run">Run</option>
                <option value="walk">Walk</option>
              </select>
              <p v-else>{{ item.cardioType }}</p>
            </div>

            <!-- distance -->
            <div class="flex flex-1 flex-col">
              <label for="distance" class="mb-1 text-sm text-at-light-green">
                Distance
              </label>
              <input
                type="text"
                id="distance"
                v-if="edit"
                class="p-2 w-full text-gray-500 focus:outline-none"
                v-model="item.distance"
              />
              <p v-else>{{ item.distance }}</p>
            </div>

            <!-- duration -->
            <div class="flex flex-1 flex-col">
              <label for="duration" class="mb-1 text-sm text-at-light-green">
                Duration
              </label>
              <input
                type="text"
                id="duration"
                v-if="edit"
                class="p-2 w-full text-gray-500 focus:outline-none"
                v-model="item.duration"
              />
              <p v-else>{{ item.duration }}</p>
            </div>

            <!-- pace -->
            <div class="flex flex-1 flex-col">
              <label for="pace" class="mb-1 text-sm text-at-light-green">
                Pace
              </label>
              <input
                type="text"
                id="pace"
                v-if="edit"
                class="p-2 w-full text-gray-500 focus:outline-none"
                v-model="item.pace"
              />
              <p v-else>{{ item.pace }}</p>
            </div>

            <!-- delete icon -->
            <img
              v-if="edit"
              @click="deleteExercise(item.id)"
              src="@/assets/images/trash-light-green.png"
              alt="trash icon"
              class="absolute h-4 w-auto -left-5 cursor-pointer"
            />
          </div>

          <button
            v-if="edit"
            @click="addExercise"
            type="button"
            class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-green duration-200 border-solid border-2 border-transparent hover:border-at-light-green hover:bg-white hover:text-at-light-green"
          >
            Add Exercise
          </button>
        </div>
      </div>

      <!-- update workout -->
      <!-- button -->
      <button
        v-if="edit"
        @click="update"
        type="button"
        class="mt-10 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-green duration-200 border-solid border-2 border-transparent hover:border-at-light-green hover:bg-white hover:text-at-light-green"
      >
        Update Workout
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { supabase } from '../supabase/init';
import { useRoute, useRouter } from 'vue-router';
import store from '../store/index';
import { uid } from 'uid';

export default {
  name: 'view-workout',
  setup() {
    // Create data / vars
    const data = ref(null);
    const dataLoaded = ref(null);
    const errorMessage = ref(null);
    const statusMessage = ref(null);
    const route = useRoute();
    const user = computed(() => store.state.user);
    const router = useRouter();

    // Get current Id of route
    const currentId = route.params.workoutId;

    // Get workout data
    const getData = async () => {
      try {
        const { data: workouts, error } = await supabase
          .from('workouts')
          .select('*')
          .eq('id', currentId);
        if (error) throw error;
        data.value = workouts[0];

        dataLoaded.value = true;

        console.log(data.value);
      } catch (error) {
        errorMessage.value = error.message;

        setTimeout(() => {
          errorMessage.value = false;
        }, 5000);
      }
    };

    getData();

    // Delete exercise
    const deleteExercise = (id) => {
      if (data.value.exercises.length > 1) {
        data.value.exercises = data.value.exercises.filter(
          (exercise) => exercise.id !== id
        );
        return;
      }

      errorMessage.value =
        'Error: Cannot remove, need to have at least one exercise';

      setTimeout(() => {
        errorMessage.value = false;
      }, 5000);
    };

    // Edit mode
    const edit = ref(null);

    const editMode = () => {
      edit.value = !edit.value;
    };

    // Add exercise
    const addExercise = () => {
      if (data.value.workoutType === 'strength') {
        data.value.exercises.push({
          id: uid(),
          exercise: '',
          sets: '',
          reps: '',
          weight: '',
        });
        return;
      }

      data.value.exercises.push({
        id: uid(),
        cardioType: '',
        distance: '',
        duration: '',
        pace: '',
      });
    };

    // Delete Workout
    const deleteWorkout = async () => {
      try {
        const { error } = await supabase
          .from('workouts')
          .delete()
          .eq('id', currentId);
        if (error) throw error;
        router.push({ name: 'Home' });
      } catch (error) {
        errorMessage.value = `Error: ${error.message}`;
        setTimeout(() => {
          errorMessage.value = false;
        }, 5000);
      }
    };

    // Update Workout
    const update = async () => {
      try {
        const { error } = await supabase
          .from('workouts')
          .update({
            workoutName: data.value.workoutName,
            exercises: data.value.exercises,
          })
          .eq('id', currentId);

        if (error) throw error;
        edit.value = false;
        statusMessage.value = 'Success: Workout Updated';
        setTimeout(() => {
          statusMessage.value = false;
        }, 5000);
      } catch (error) {
        errorMessage.value = `Error: ${error.message}`;
        setTimeout(() => {
          errorMessage.value = false;
        }, 5000);
      }
    };

    return {
      statusMessage,
      errorMessage,
      data,
      dataLoaded,
      edit,
      editMode,
      user,
      deleteWorkout,
      addExercise,
      deleteExercise,
      update,
    };
  },
};
</script>
