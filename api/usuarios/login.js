import { supabase } from './supabaseClient';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { usuario, senha } = req.body;

    if (!usuario || !senha) {
      return res.status(400).send("Usuário e senha são obrigatórios");
    }

    try {
      const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('email', usuario)
        .single();

      if (error || !data) {
        return res.status(400).send({ msg: "Usuário não encontrado" });
      }

      const isMatch = await bcrypt.compare(senha, data.senha);
      if (!isMatch) {
        return res.status(400).send({ msg: "Senha incorreta" });
      }

      const token = jwt.sign({ id: data.id_usuarios }, "segredo", { expiresIn: '1h' });
      res.json({ token });
    } catch (err) {
      res.status(500).send({ msg: `Erro no login: ${err.message}` });
    }
  } else {
    res.status(405).send({ msg: 'Método não permitido' });
  }
}
