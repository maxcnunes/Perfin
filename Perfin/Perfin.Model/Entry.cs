using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Perfin.Model
{
    public class Entry
    {
        public int Id { get; set; }
        public Decimal Price { get; set; }
        public Account Account { get; set; }
        public string Description { get; set; }
        

        //data da compra/receita
        public DateTime RegistryDate { get; set; } 
        
        //data, geralmente mes, para pagamento/recebimento (geralmente em caso de cartao 
        //de credito ou movimentaçoes para pagamento/recebimento com mais de 30 dias)
        public DateTime PaymentDate { get; set; } 


    }
}
