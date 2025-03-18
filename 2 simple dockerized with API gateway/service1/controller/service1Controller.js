exports.showMessage = (req, res) => {
    const { message } = req.body;
    console.log(`Service1 received: ${message}`);
    res.status(200).send({ message: 'Message printed on Service1' });
  };