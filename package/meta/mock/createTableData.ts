import { v4 as uuidv4 } from 'uuid'
import { ref } from 'vue'

export function createTableData() {
  const initials = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']

  const createData: { name: string; id: string }[] = Array.from({
    length: 40,
  }).map((_, idx) => ({
    id: uuidv4(),
    key: uuidv4(),
    name: `${initials[idx % 10]}${idx}`,
    type: `${initials[idx % 10]}${idx}`,
  }))

  const checkProps = {
    label: 'name',
    value: 'id',
  }

  const value = ref([createData[3].id])

  return {
    checkProps,
    value,
    createData,
  }
}
