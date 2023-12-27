import { ArticleData, ArticleForm, Id } from './interface'
import { supabase } from './supabase'

// failable
export const fetchAll = async (): Promise<
	Array<ArticleData>
> => {
	const { data, error } = await supabase
		.from('articles')
		.select()

	if (error) throw error

	return data
}

// failable
export const postArticle = async (
	form: ArticleForm,
): Promise<void> => {
	const { error } = await supabase
		.from('articles')
		.insert(form)

	if (error) throw error
}

// failable
export const deleteArticle = async (
	id: Id,
): Promise<void> => {
	const { error } = await supabase
		.from('articles')
		.delete()
		.eq('id', id)

	if (error) throw error
}

// failable
export const upVote = async (id: Id): Promise<void> => {
	const { data, error } = await supabase
		.from('articles')
		.select('up')
		.eq('id', id)

	if (error) throw error
	if (data === null) throw 'not found'
	if (data.length !== 1) throw 'too less or much'

	const { error: error2 } = await supabase
		.from('articles')
		.update({
			up: data[0].up + 1,
		})
		.eq('id', id)

	if (error2) throw error2
}
