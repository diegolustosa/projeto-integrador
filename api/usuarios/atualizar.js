import supabase from './supabaseClient';  

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { id } = req.query; 
    const { usuario, email } = req.body;

    try {
     
      const { data, error } = await supabase
        .from('usuarios') 
        .update({ usuario, email }) 
        .eq('id_usuarios', id); 

      if (error) {
        return res.status(500).json({ msg: 'Erro ao atualizar usuário', error });
      }

      
      res.status(200).json({ msg: "Usuário atualizado com sucesso", data });
    } catch (err) {
      res.status(500).json({ msg: `Erro ao atualizar usuário: ${err.message}` });
    }
  } else {
    
    res.status(405).json({ msg: 'Método não permitido' });
  }
}
